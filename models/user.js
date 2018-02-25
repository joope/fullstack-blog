const mongoose = require('mongoose')

const User = mongoose.model('User', {
    username: String,
    name: String,
    adult: Boolean,
    password: String
  })
  
module.exports = User