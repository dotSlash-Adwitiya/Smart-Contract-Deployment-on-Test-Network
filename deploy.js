const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");

const { abi, evm } = require("./compile");

// The url in below string is the Test Network's URL,
// and the mnemonic phrase is of the account we want to connect.
// We're storing it in the provider so that we can give this provider to the
provider = new HDWalletProvider("YOUR_MNEMONIC_PHASES", "YOUR_INFURA_URL");

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
