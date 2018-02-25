const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const config = require('./utils/config')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

mongoose
  .connect(config.mongoUrl)
  .then(() => console.log('connected to database', config.mongoUrl))
  .catch(err => console.log(err))

const server = http.createServer(app)
const PORT = config.port

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, 
  server
}
