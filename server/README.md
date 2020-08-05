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

## Assumptions

The server will listen to port `3000` by default. You can change this by altering the `port` variable in `index.js`.

By default, the server assumes that the core Gemini files (in particular `simulate.py`, the main Gemini entry point, and `common.sh`, which tells `simulate.py` where to find the core Gemini ASP files) are located in an adjacent directory to this one, named `asp/`. This is based on the file structure of the Gemini repo. You can change this by altering the `geminiPath` variable in `index.js`.

Whenever the server receives a request, it will save the provided intent as a file in the `generated/intents/` directory. Generated games will be saved as files in the `generated/games/` directory. The current version of the server doesn't ever clean up these files on its own, so you might want to delete the `generated/` directory from time to time if you don't want to accumulate too much garbage on your filesystem.
