const assert = require("assert");

//* It is very important to import - 'ganache' instead of 'ganache-cli'
//* Else you'll get ERP1559NotSupportedError
const ganache = require("ganache");
const { Web3 } = require("web3");

// Below line creates an instance of web3, and tells that instance,
// to connect to ganache provider test network that we're currently running on our machine
const web3 = new Web3(ganache.provider());

//* ABI is the JavaScript code used to interact with the contract and
//*  the Bytecode is the actual compiled RAW Contract (inbox.sol)
const { abi, evm } = require("../compile");

let accounts;
let inbox;

//* Mocha Framework Tests :-
//* beforeEach() will be executed before every it() block.
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // We're accessing the 'eth' module of ethereum for getting all the accounts
  // bytecode is passed as the arguments, and a string for out Contract's constructor
  // Sending details : send from account[0], use gas limit specified - 1,000,000
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ["Hi there!"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

/*
 * assert.ok(value)  : Whatever value you've passed, this method will ensure that, that value has a defined value.
 * So, what we do is, we pass the inbox variable. This ensure that the contract is deployed on the network.
 */

//* describe is used to wrap a collection of tests into single unit for better readability
describe("Inbox", () => {
  it("deploys a contract", () => {
    // inbox.options.address is fetched from the bytecode that is, we had to look into the bytecode by console.log() to find this out.
    assert.ok(inbox.options.address);
  });
  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi there!");
  });
  it("can change the message", async () => {
    await inbox.methods.setMessage("bye").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "bye");
  });
});
