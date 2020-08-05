# gemini-server

A websocket server that exposes Gemini's game generation capabilities to web clients, originally intended for use by the [Germinate frontend](https://github.com/ExpressiveIntelligence/GeminiTool).

Run the server with `node index.js`.

## Usage

First, open a websocket connection to the server and set up an event handler for the `onmessage` event:

```js
const socket = new WebSocket("ws://127.0.0.1:3000");
socket.onopen = function(ev) {
  console.log("connection to server opened!");
};
socket.onmessage = function(ev) {
  const data = JSON.parse(ev.data);
  // handle the message from the server
};
socket.onclose = function(ev) {
  console.log("connection to server closed!");
};
```

Once you've got a websocket open, you can request a batch of games by sending the server a JSON message:

```js
const request = {
  batchID: "batch1596589202517", // a string ID for the batch of games you've requested
  intent: "...", // a Gemini intent (a string of AnsProlog code)
  numGamesToGenerate: 100, // optional (default 100), passed directly to Gemini
  numDistinctGameProgenitors: 20 // optional (default 20), passed directly to Gemini
};
socket.send(JSON.stringify(request));
```

When the server generates a game, it'll send you back a JSON message with the following contents:

```js
{
  batchID: "batch1596589202517", // the batch ID string you provided in your request
  gameID: "batch1596589202517_1", // a unique string ID for this specific game
  game: "..." // the generated game (a string of AnsProlog code + "how to play" instructions)
}
```

Alternatively, if the server runs into a problem while processing your request, it'll send you back a message that looks like this:

```js
{
  batchID: "batch1596589202517", // the batch ID string you provided in your request
  type: "error",
  errMsg: "No valid games for intent" // a string error message
}
```

## Configuration

The `config.js` file contains several configuration variables that you might want to change:

* `config.port`: The port to which the server will listen. Set to `3000` by default.
* `config.geminiPath`: The path to the core Gemini files. This should always be a directory containing `simulate.py` (the main Gemini entry point) and `common.sh` (which tells `simulate.py` where to find the core Gemini ASP files). Set to `../asp` by default. This is correct if you've pulled down the Gemini repo, but in case you want to use a different version of Gemini (e.g. a local development version), you're free to change this.
* `config.python3Command`: The name of the Python 3 command, which the server will use to launch `simulate.py`. Set to `python3` by default. Depending on how your environment is set up, you might want a different command instead; for instance, Windows users might want to change this to `py`.

## Caveats

Whenever the server receives a request, it will save the provided intent as a file in the `generated/intents/` directory. Generated games will be saved as files in the `generated/games/` directory. The current version of the server doesn't ever clean up these files on its own, so you might want to delete the `generated/` directory from time to time if you don't want to accumulate too much garbage on your filesystem.
