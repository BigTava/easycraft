const { ethers } = require("hardhat")
const { SUPPLIER_ID } = require("../constants/supplier.js")

async function addSupplier(supplierId) {
    const marketPlace = await ethers.getContract("MarketPlace")
    const args = [supplierId]

    console.log(`Creating supplier with id ${supplierId}...`)

    const options = {
        value: ethers.parseEther("1000"), // convert to wei
    }
    const transactionResponse = await marketPlace.addSupplier(...args, options)
    const transactionReceipt = await transactionResponse.wait(1)

    const eventsLength = transactionReceipt.events.length
    const supplierAddress = transactionReceipt.events[eventsLength - 1].args.supplier
    console.log(`Supplier with address ${supplierAddress}`)
    console.log("----------------------------------------------------")
}

addSupplier(SUPPLIER_ID)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
