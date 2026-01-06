require('dotenv').config()

const connectToDB = require('./utils/ConnectDB')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var authRouter = require('./routes/auth')
var blogRouter = require('./routes/blog')
var app = express()

connectToDB()

const cors = require('cors')

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin || true) // allow all origins
    },
    credentials: true
  })
)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', indexRouter)
app.use('/api/auth', authRouter)
app.use('/api/blogs', blogRouter)

module.exports = app

app.listen(process.env.PORT, () => {
  console.log('Server running at port:', process.env.PORT)
})
