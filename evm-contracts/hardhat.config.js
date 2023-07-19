require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("hardhat-deploy")
require("./tasks/faucet")

/* Wallet Keys */
const PRIVATE_KEY = process.env.MNEMONIC

const accounts = PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : []

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
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
    },
    solidity: "0.8.17",
    mocha: {
        timeout: 200000, // 200 seconds max for running tests
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
    typechain: {
        outDir: "typechain",
        target: "ethers-v5",
    },
}
