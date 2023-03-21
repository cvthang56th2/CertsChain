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
    required: true,
    ref: 'User'
  },
  schoolId: {
    type: ObjectId,
    required: true,
    ref: 'School'
  },
  courceId: {
    type: ObjectId,
  },
  courseId: {
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
  status: {
    type: String,
    required: false,
    default: 'active'
  },
}, 
{ timestamps: true })
// Compile model from schema
module.exports = mongoose.model('Certificate', Certischema)
