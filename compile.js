// Below are modules that allows us to find the exact location of our files in this directory
// Path is to fetch path
// Fs is a filesystem module of node.js that allows us to to interact with the filesystem.
const path = require("path");
const fs = require("fs");
const solc = require("solc");

//* __dirname is kind of a constant defined in JS, that fetches the current path of directory we're in.
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts);
/*
 * Module.exports is a special variable and a property
 * so that we can use the compiled output anywhere in our application
 * In our case, the compiled output is the ABI and the interface.
 */
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "Inbox.sol"
].Inbox;
