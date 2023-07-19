const web3 = require("web3")

const SUPPLIER_ID = web3.utils.asciiToHex("1").padEnd(66, "0")

module.exports = {
    SUPPLIER_ID,
}
