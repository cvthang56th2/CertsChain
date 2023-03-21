const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Types

const Schoolschema = new Schema({
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
  courseId: {
    type: ObjectId,
    required: true
  },
  courceId: {
    type: ObjectId
  },
  status: {
    type: String,
    required: false,
    default: 'pending'
  },
}, 
{ timestamps: true })
// Compile model from schema
module.exports = mongoose.model('CertiRequest', Schoolschema)
