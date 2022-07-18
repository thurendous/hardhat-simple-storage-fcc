
const { ethers } = require("hardhat")
const {expect, assert} = require("chai")


describe("", function () {
  let SimpleStorage, simpleStorage
  beforeEach(async function () {
    SimpleStorage = await ethers.getContractFactory("SimpleStorage")
    // console.log(SimpleStorage)
    simpleStorage = await SimpleStorage.deploy()
    await simpleStorage.deployed()
    console.log(simpleStorage.address)
  })

  it("should start with a favourite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    // expect, assert
    assert(currentValue.toString(), expectedValue)
    expect(currentValue.toString()).to.equal(expectedValue)
  })

  it("should update when we call store", async function () {
    const transactionResponse = await simpleStorage.store(222)
    await transactionResponse.wait(1)
    const currentValue = await simpleStorage.retrieve()
    expect(currentValue.toString()).to.equal("222")
  })

  it("should add person ", async function () {
    const transactionResponse = await simpleStorage.addPerson("mark", 15)
    await transactionResponse.wait(1)
    const currentValue = await simpleStorage.retrieve()
    expect((await simpleStorage.nameToFavoriteNumber("mark")).toString()).to.equal("15")
    // console.log(await simpleStorage.people(15)).to.equal("mark")
  })

})