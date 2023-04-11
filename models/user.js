const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const roll = require('./roll')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true 
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {},
    identity: {
        type: String,
        unique: true 
    },
    phone: {
        type: String,
        unique: true 
    }
})

module.exports = mongoose.model('User', userSchema)
