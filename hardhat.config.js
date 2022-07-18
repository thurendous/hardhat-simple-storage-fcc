const { task } = require("hardhat/config")

require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks")
require("hardhat-gas-reporter")
require("solidity-coverage")


const RINKEBY_URL = process.env.RINKEBY_RPC_URL || ""
const PRIVATE_KEE = process.env.PRIVATE_KEE || ""
const ETHERSCAN = process.env.ETHERSCAN_KEY || ""
const COINMARKETCAP_API = process.env.COINMARKETCAP_API || ""

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        rinkeby: {
            url: RINKEBY_URL,
            accounts: [PRIVATE_KEE],
            chainId: 4,
            gasPrice: 2500000000,
        },
        localhost: {
          url: "http://127.0.0.1:8545/",
          chainId: 31337,
        }
    },
    solidity: "0.8.15",
    etherscan: {
        apiKey: ETHERSCAN,
    },
    gasReporter: {
      enabled: true,
      outputFile: "gas-report.txt",
      noColors: true,
      currency: "USD",
      coinmarketcap: COINMARKETCAP_API,
      token: "matic"
    }
}
