const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Cours = require('../models/cours')
const User = require('../models/user')
const Sec = require('../models/sectionsformats')
const CoursFormats = require('../models/coursFormats')
const bcrypt = require('bcrypt')
const methodOverride = require('method-override')
const { render } = require('ejs')
const Section = require('../models/section')

router.get('/:id/:sec', async (req, res) => {
    try {
        const cours = await Cours.findById(req.params.id)
        const courseformat = await CoursFormats.findById(cours.format)
        const sections = await courseformat.body
        const currentSection = await ד
        const sectionFormat = await Sec.findById(currentSection.format)
        const currentTime = await cours.progress
        res.render('cours.ejs', { name: req.user.name, cours: courseformat, cours1: cours , sec: sectionFormat ,section: currentSection, videoTime: currentTime, sections: sections})
    } catch (e) {
        console.log(e);
    }

})
 
router.post('/:id/:sec', async (req, res) => {
    try {
        const cours = await Cours.findById(req.params.id)
        cours.progressSec = req.params.sec
        cours.progress = req.body.progress
        await cours.save()
        res.redirect('/')
    } catch (e) {
        console.log(e);
        res.redirect('/')
    }
})

router.post('/:id/:sec/change', async (req, res) => {
    try {
        const cours = await Cours.findById(req.body.cours)
        cours.progressSec = cours.progressSec + 1
        cours.progress = 0
        await cours.save()
        res.redirect(`/mycourses/${cours.id}/${cours.progressSec + 1}`)
    } catch (e) {
        console.log(e);
        res.redirect('/')
    }
})

router.get('/test', async (req, res) => {
    try {
        res.render('tests/test_view.ejs')
    } catch (e) {
        console.log(e);
    }
})
  

module.exports = router