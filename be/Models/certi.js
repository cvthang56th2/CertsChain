const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Certischema = new Schema({
  certinumber: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
  blockindex: {
    type: String,
    required: true,
  },
  nonce: {
    type: String,
    required: true,
  },
  prehash: {
    type: String,
    required: true,
  },
})
// Compile model from schema
module.exports = mongoose.model('Certificate', Certischema)
