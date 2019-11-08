const child_process = require('child_process');
const chokidar = require('chokidar');
const fs = require('fs');
const http = require('http');
const websocket = require('websocket');

// webserver config
const hostname = '127.0.0.1';
const port = 3000;

// track connected clients and WIP game batches
const connectedClients = {};
const batchesInProgress = {};

// generate a new batch of games with the specified options
function generateGames(opts) {
  // TODO actually use the intent received in opts (i.e. from the client)
  const {batchID, /*intent,*/ numDistinctGameProgenitors = 1, numGamesToGenerate = 1} = opts;
  const intent = fs.readFileSync('./intents/dinner_intent.lp'); // use a known-good intent for testing

  const outFileName = `./games/${batchID}`;

  // create intent file for this batch
  const intentFileName = `./intents/${batchID}.lp`;
  fs.writeFileSync(intentFileName, intent);

  // set up arguments to the Gemini generation process
  const geminiArgs = ['simulate.py', outFileName, numDistinctGameProgenitors, '$(./common.sh)',
                      intentFileName, numGamesToGenerate, '--project'];

  // launch the Gemini generation process
  console.log(`#### STARTED GENERATING BATCH: ${batchID}`);
  const startTime = Date.now();
  const geminiProcess = child_process.spawn('python3', geminiArgs);
  // TODO figure out why Gemini won't generate unless there are stdout/stderr data listeners here
  geminiProcess.stdout.on('data', data => {});
  geminiProcess.stderr.on('data', data => {});
  geminiProcess.on('close', code => {
    const endTime = Date.now();
    console.log(`#### FINISHED GENERATING BATCH: ${batchID} (took ${endTime - startTime}ms)`);
  });
}

// initialize the HTTP server
const server = http.createServer((req, res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('no thanks');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// initialize the websocket server
const wsServer = new websocket.server({httpServer: server});
wsServer.on('request', req => {
  const connection = req.accept();
  const clientID = 'client' + Date.now(); // TODO better client ID generation
  console.log(`Client connected: ${clientID}`);
  connectedClients[clientID] = connection;

  // when a client requests a new batch of games, keep track of the batch's requester
  connection.on('message', msg => {
    console.log(`Client sent message: ${clientID}`);
    const opts = JSON.parse(msg.utf8Data);
    console.log(opts);
    batchesInProgress[opts.batchID] = clientID;
    opts.clientID = clientID;
    generateGames(opts);
  });

  // when the client disconnects, log the event and clear it from the server state
  connection.on('close', (reasonCode, desc) => {
    console.log(`Client disconnected: ${clientID}`);
    delete connectedClients[clientID];
    for (let batchID of Object.keys(batchesInProgress)) {
      if (batchesInProgress[batchID] === clientID) {
        delete batchesInProgress[batchID];
      }
    }
  });
});

// move into the top-level asp directory
process.chdir('../asp');

// initialize the watcher that keeps track of new game files
const watcher = chokidar.watch('./games', {
  ignoreInitial: true,
  persistent: true
});
watcher.on('add', (path, stats) => {
  // extract info about this game from its filename
  const gameInfo = path.match(/\/([A-Za-z0-9_-]+)_([0-9]+)\.lp$/);
  if (!gameInfo) return; // bail out early if we can't parse game info from this filename
  const [_, batchID, gameID] = gameInfo;
  console.log(`#### GENERATED GAME IN BATCH: ${batchID} (game ${gameID})`);

  // figure out which client requested this game, so we can send it to them
  const clientID = batchesInProgress[batchID];
  const connection = connectedClients[clientID];

  // bail out early if the client that requested this game is no longer connected
  if (!connection) {
    console.log(`Requester of batch ${batchID} is no longer connected.`);
    return;
  }

  // send the game to the client that requested it
  console.log(`Sending game to requester ${clientID}!`);
  const game = fs.readFileSync(path, 'utf8');
  const res = {batchID, gameID, game};
  connection.sendUTF(JSON.stringify(res));
});
