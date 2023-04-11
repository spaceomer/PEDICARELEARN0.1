const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
    },
    option4: {
        type: String,
    },
    answer: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Question', questionSchema)