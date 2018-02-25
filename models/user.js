const mongoose = require('mongoose')

const User = mongoose.model('User', {
    username: String,
    name: String,
    adult: Boolean,
    passwordHash: {type: String, select: false}
  })
  
module.exports = User