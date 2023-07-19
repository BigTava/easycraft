require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

require("./tasks/faucet");

let accounts = { mnemonic: process.env.MNEMONIC };

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "gnosis",
  networks: {
    hardhat: {},
    gnosis: {
      url: "https://rpc.gnosischain.com",
      accounts: accounts,
    },
    chiado: {
      url: "https://rpc.chiadochain.net",
      gasPrice: 1000000000,
      accounts: accounts,
    },
  },
  solidity: "0.8.17",
};
