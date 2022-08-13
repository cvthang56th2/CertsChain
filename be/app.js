const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const connectDb = require('./db')
const indexRouter = require('./routes/index')
const app = express()
//connecting to database
connectDb().then(
  () => {
    /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
    console.log('Database Connected')
  },
  (err) => {
    /** handle initial connection error */
    console.log('Database Connection error', err)
  }
)
// view engine setup
app.set('view engine', 'ejs')

const cors = require('cors');

const corsOption = {
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));
//if you want in every domain then
app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  if (err.code === "INCORRECT_FILETYPE") {
    res.status(422).json({ error: 'Only images are allowed' });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: 'Allow file size is 500KB' });
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send(err)
})

module.exports = app
