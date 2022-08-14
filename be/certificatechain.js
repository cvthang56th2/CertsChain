const sha256 = require('sha256')

function Blockchain() {
  this.chain = []
  this.pendingcertificate = []
  this.createNewBlock(3088, '', '#')
}

Blockchain.prototype.createNewBlock = function (nonce, prehash, hash) {
  return new Promise((resolve, reject) => {
    const newBlock = {
      index: this.chain.length + 1,
      certificate: this.pendingcertificate[0],
      timestamp: Date.now(),
      nonce,
      hash,
      prehash,
    }
    this.pendingcertificate = []
    this.chain.push(newBlock)
    resolve(newBlock)
  })
}

Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1]
}

Blockchain.prototype.createNewcertificate = function (certiNo, certiData) {
  const newcertificate = {
    certiNo,
    certiData,
  }
  this.pendingcertificate.push(newcertificate)
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

Blockchain.prototype.isValidBlock = async function (prehash, hash) {
  const index = this.chain.findIndex(e => e.prehash === prehash && e.hash === hash)
  if (index === 0) {
    return true
  }
  if (index === -1 || this.chain[index].prehash !== this.chain[index - 1].prehash) {
    return false
  }
  return true
}

module.exports = Blockchain
