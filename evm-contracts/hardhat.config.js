require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

let accounts = { mnemonic: process.env.MNEMONIC }

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "gnosis",
  networks: {
    hardhat: {
    },
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
