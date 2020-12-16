const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const textRouter = require('./controllers/text')
const truthOrDareRouter = require('./controllers/truthOrDares')

mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch( err => {
    console.log(err)
  })

app.use(middleware.tokenExtractor)
app.use(cors())
app.use(bodyParser.json())
// app.use(express.static('build'))
app.use(middleware.logger)

app.use('/api/users', usersRouter)
app.use('/api/truthOrDare', truthOrDareRouter)
app.use('/api/login', loginRouter)
app.use('/api/text', textRouter)

app.use(middleware.error)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}