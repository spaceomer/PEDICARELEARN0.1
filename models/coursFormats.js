const e = require('express');
const mongoose = require('mongoose')

const coursSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: [
        {
        }
    ]
})

module.exports = mongoose.model('CoursFormats', coursSchema)