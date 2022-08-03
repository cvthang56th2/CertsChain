var mongoose = require('mongoose')
//Set up default mongoose connection
var uri = 'mongodb://localhost:27017/certschain'

const connectDb = async () => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}
module.exports = connectDb
