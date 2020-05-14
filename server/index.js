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

// cancel previously initiated Gemini processes for this client
function cancelPreviousBatchIfAny(clientID) {
  for (let batchID of Object.keys(batchesInProgress)) {
    if (batchesInProgress[batchID].client === clientID) {
      batchesInProgress[batchID].process.kill();
      delete batchesInProgress[batchID];
    }
  }
}

// generate a new batch of games with the specified options
function generateGames(opts) {
  const {batchID, intent, numGamesToGenerate = 100, numDistinctGameProgenitors = 5} = opts;
  //const intent = fs.readFileSync('./intents/tool_intent_real.lp'); // use a known-good intent for testing

  const outFileName = `./games/${batchID}`;

  // create intent file for this batch
  const intentFileName = `./intents/${batchID}.lp`;
  fs.writeFileSync(intentFileName, intent);

  // set up arguments to the Gemini generation process
  const geminiArgs = ['simulate.py', outFileName, numGamesToGenerate, '$(./common.sh)',
                      intentFileName, numDistinctGameProgenitors, '--project'];

  // launch the Gemini generation process
  console.log(`#### STARTED GENERATING BATCH: ${batchID}`);
  const startTime = Date.now();
  const geminiProcess = child_process.spawn('python3', geminiArgs);
  // TODO figure out why Gemini won't generate unless there are stdout/stderr data listeners here
  geminiProcess.stdout.on('data', data => {});
  geminiProcess.stderr.on('data', data => {
    const errMsg = data.toString();
    console.log('err', errMsg);
    if (errMsg.trim().endsWith("KeyError: 'Witnesses'")) {
      // no valid games for this intent – tell the client there was an error
      const clientID = batchesInProgress[batchID].client;
      const connection = connectedClients[clientID];
      if (!connection) {
        console.log(`Requester of batch ${batchID} is no longer connected.`);
        return;
      }
      console.log(`Reporting error to requester ${clientID}!`);
      const res = {batchID, type: 'error', errMsg: 'No valid games for intent'};
      connection.sendUTF(JSON.stringify(res));
    }
  });
  geminiProcess.on('close', code => {
    const endTime = Date.now();
    console.log(`#### FINISHED GENERATING BATCH: ${batchID} (took ${endTime - startTime}ms)`);
  });
  return geminiProcess;
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
    cancelPreviousBatchIfAny(clientID);
    const opts = JSON.parse(msg.utf8Data);
    console.log(opts);
    opts.clientID = clientID;
    const geminiProcess = generateGames(opts);
    batchesInProgress[opts.batchID] = {client: clientID, process: geminiProcess};
  });

  // when the client disconnects, log the event and clear it from the server state
  connection.on('close', (reasonCode, desc) => {
    console.log(`Client disconnected: ${clientID}`);
    delete connectedClients[clientID];
    cancelPreviousBatchIfAny(clientID);
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
  const clientID = batchesInProgress[batchID].client;
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
