const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    try {
        const users = await User
          .find({})
          .populate('blogs', {likes: 1, author: 1, title: 1, url: 1})
        res.json(users)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

usersRouter.post('/', async (request, response) => {
  try {
    const { username, name, adult=true, password } = request.body

    if (password.length <= 3) {
      return response.status(400).json({error: 'password too short'})
    }
    const existingUser = await User.find({username: username});
    if (existingUser.length > 0) {
      return response.status(400).json({error: 'username already taken'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username: username,
      name, name,
      adult: adult,
      passwordHash: passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter
