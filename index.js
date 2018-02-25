const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const tokenParser = require('./middleware/parseToken')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


const config = require('./utils/config')

app.use(cors())
app.use(bodyParser.json())
app.use(tokenParser)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

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
