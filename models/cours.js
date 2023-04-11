const mongoose = require('mongoose')

const progressSchema = new mongoose.Schema({
    currentSection: Number,
    currentTime: Number
})

const coursSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    create: {
        type: Date,
        require: true,
        default: Date.now()
    },
    end: {
        type: Date,
        require: true,
        default: Date(Date.now() + 30)
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    format: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CoursFormats',
        required: true
    },
    progress: {
        type: Number,
        default: 0
    },
    progressSec: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Cours', coursSchema)