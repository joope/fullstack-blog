const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    try {
        console.log(request.body)
        const { username, password } = request.body
        const user = await User.findOne({username: username}).select('+passwordHash')

        if (!user) {
            return response.status(401).json({ error: 'invalid username or password'})
        }
        const validPassword = await bcrypt.compare(password, user.passwordHash)

        if (!(user && validPassword)) {
            return response.status(401).json({ error: 'invalid username or password'})
        }

        const tokenData = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(tokenData, process.env.SECRET)

        response.json({ token, username: user.username, name: user.name })
    } catch (err) {
        console.log(err)
        response.status(500).send({error: 'Something went wrong'})
    }
})
  
module.exports = loginRouter