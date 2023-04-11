const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    format: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sec',
        required: true
    }, 
    coursformat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CoursFormats',
        required: true
    }, 
    quiz: {
        type: Array,
    },
    order: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Section', sectionSchema)