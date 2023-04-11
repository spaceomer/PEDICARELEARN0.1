const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: {
        type: Array,
        required: true
    },
    cours: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CoursFormats'
    },
})

module.exports = mongoose.model('Test', testSchema)