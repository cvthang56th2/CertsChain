const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Schoolschema = new Schema({
  name: {
    type: String,
    required: true,
  },
  directorName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  contact: {
    type: String,
    required: true,
  },
  cources: [{
    name: String,
    teacherName: String,
    description: String,
    time: String,
    students: [String]
  }],
  status: {
    type: String,
    required: false,
    default: 'active'
  },
}, 
{ timestamps: true })
// Compile model from schema
module.exports = mongoose.model('School', Schoolschema)
