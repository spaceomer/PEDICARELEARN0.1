const mongoose = require('mongoose')
const path = require('path')

const videoBasePath = 'uploads/videos'

const sectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    video: {
        type: String,
        required: true
    },
    quiz: {
        type: Array,
    }
})

sectionSchema.virtual('videoPath').get(function() {
    if (this.video != null) {
        return path.join('/', videoBasePath, this.video)
    }
})

module.exports = mongoose.model('Sec', sectionSchema)
module.exports.videoBasePath = videoBasePath