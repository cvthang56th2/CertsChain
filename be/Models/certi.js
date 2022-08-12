const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Types

const Certischema = new Schema({
  certinumber: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    required: true
  },
  schoolId: {
    type: ObjectId,
    required: true
  },
  courceId: {
    type: ObjectId,
    required: true
  },
  certSrc: {
    type: String,
    required: true
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
