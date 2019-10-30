const child_process = require('child_process');
const fs = require('fs');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url !== '/') {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('no thanks');
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  const outFileName = 'games/dummy_game';
  const intentFileName = 'intents/dinner_intent.lp';

  // these should usually be the same
  const numDistinctGameProgenitors = 1; // from which all other games descend
  const numGamesToGenerate = 1; // or 0 to generate all possible games for this intent (can run for a long time)
  // NB: it takes about 40 seconds per game to generate on Max's laptop as of 2019-10-30

  process.chdir('../asp');

  const geminiArgs = ['simulate.py', outFileName, numDistinctGameProgenitors, '$(./common.sh)',
                      intentFileName, numGamesToGenerate, '--project'];
  
  const startTime = Date.now();
  console.log('#### started executing');
  const geminiProcess = child_process.spawnSync('python3', geminiArgs);
  console.log('#### finished executing!!!');
  const endTime = Date.now();
  console.log(`took ${endTime - startTime} millis`); 

  const firstGameFileName = outFileName + '_1.lp';
  const firstGameFile = fs.readFileSync(firstGameFileName);
  res.end(firstGameFile);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
