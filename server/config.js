const config = {};

// Standard webserver configuration.
config.hostname = "127.0.0.1";
config.port = 3000;

// Where the server will look for the core Gemini files.
// This should be a path to a directory that contains `simulate.py` (the main Gemini entry point)
// and `common.sh` (which tells `simulate.py` where to find the core Gemini ASP files).
config.geminiPath = "../asp";

// The CLI command to use when launching Python 3.
// This is probably "python3" on most Unix-like systems and "py" on Windows,
// although you might also want "python" depending on how your environment is set up.
config.python3Command = "python3";

module.exports = config;
