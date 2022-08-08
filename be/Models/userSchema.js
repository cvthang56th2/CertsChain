const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Userschema = new Schema({
  username: {
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
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  contactNo: {
    type: String,
    required: false,
  },
  currentAddress: {
    type: String,
    required: false,
  },
  permanantAddress: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
    default: 'active'
  },
}, 
{ timestamps: true })
// Compile model from schema
module.exports = mongoose.model('User', Userschema)
