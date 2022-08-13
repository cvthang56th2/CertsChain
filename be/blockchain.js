const sha256 = require('sha256')
const User = require('./Models/userSchema')

function Blockchain() {
  this.chain = []
  this.pendingaccount = []
  this.createNewBlock(3088, '', '#')
}

Blockchain.prototype.createNewBlock = function (nonce, prehash, hash) {
  return new Promise((resolve, reject) => {
    const newBlock = {
      index: this.chain.length + 1,
      username: this.pendingaccount[0] ? this.pendingaccount[0].username : '',
      timestamp: Date.now(),
      nonce,
      hash,
      prehash,
    }
    this.pendingaccount = []
    this.chain.push(newBlock)
    resolve(newBlock)
  })
}

Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1]
}

Blockchain.prototype.createNewAccount = function (username) {
  const newAccount = {
    username,
  }
  this.pendingaccount.push(newAccount)
  return this.getLastBlock()['index'] + 1
}

Blockchain.prototype.hashBlock = function (nonce, prehash, blockdata) {
  return new Promise((resolve, reject) => {
    const dataString = nonce + prehash + JSON.stringify(blockdata)
    const hash = sha256(dataString)
    resolve(hash)
  })
}

Blockchain.prototype.proofOfWork = async function (prehash, blockdata) {
  return new Promise(async (resolve, reject) => {
    let nonce = 0
    let hash = await this.hashBlock(nonce, prehash, blockdata)
    while (hash.substring(0, 4) != '0000') {
      nonce++
      hash = await this.hashBlock(nonce, prehash, blockdata)
    }

    resolve(nonce)
  })
}

module.exports = Blockchain
