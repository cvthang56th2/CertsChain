var mongoose = require('mongoose')
//Set up default mongoose connection
var uri = 'mongodb://127.0.0.1:27017/certschain'

const connectDb = async () => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}
module.exports = connectDb
