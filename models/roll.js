const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const rolls = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    permisons: {
        type: String,
        required:true  
    }
})

module.exports = mongoose.model('Roll', rolls)