// imports
const { ethers, run } = require("hardhat")
const {
    TASK_COMPILE_SOLIDITY_LOG_RUN_COMPILER_START,
} = require("hardhat/builtin-tasks/task-names")
require("dotenv").config()

// async function

const networkId = network.config.chainId

async function main() {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage")
    console.log("deploying contract... ")
    const simpleStorage = await SimpleStorage.deploy()
    await simpleStorage.deployed()
    console.log(simpleStorage.address)
    // what happens when we deploy to our hardhat network
    console.log(networkId)
    if (networkId === 4) {
        await simpleStorage.deployTransaction.wait(6)
        verify(simpleStorage.address, [])
    } else if (networkId === 31337 && process.env.ETHERSCAN) {
        console.log("this is a hardhat node")
    }
    const curretValue = await simpleStorage.retrieve()
    console.log(`Current value is : ${curretValue}`)

    const transactionResponse = await simpleStorage.store(222399)
    await transactionResponse.wait(1)
    const curretValue2 = await simpleStorage.retrieve()
    console.log(`Updated value is : ${curretValue2}`)
}

async function verify(contractAddress, args) {
    console.log("varifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            connstructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(e)
        }
    }
}

// main

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
