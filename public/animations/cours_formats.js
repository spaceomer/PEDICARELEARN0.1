const Sec = require('../models/sections')
const CoursFormats = require('../models/coursFormats')

const section = document.querySelector('.cours')

section.addEventListener('click', () => {
    window.location= '/admin'
})