const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Cours = require('../models/cours')
const User = require('../models/user')
const Sec = require('../models/sectionsformats')
const Section = require('../models/section')
const CoursFormats = require('../models/coursFormats')
const Test = require('../models/test')
const Question = require('../models/question')
const Category = require('../models/category')
const bcrypt = require('bcrypt')
const methodOverride = require('method-override')
const { render } = require('ejs')
const multer = require('multer')
const videoMimeTypes = ['video/mp4']
const path = require('path')
const uploadPath = path.join('public', Sec.videoBasePath)
const upload = multer({
    dest: uploadPath
});

router.get('/', async (req, res) => {
    const users = await User.find()

    res.render('dashBoard.ejs', {name: req.user.name, users: users})
})

router.get('/coursformats', async (req, res) => {
    const courses = await CoursFormats.find({})
    const sections = await Sec.find({}) 
    //const newCours = await CoursFormats({
    //    name: "למחיקה",
    //    description: "fdsdsdsffsfsdfdfds"
    //})
    //newCours.save()
    res.render('cours_formats/coursFormats.ejs', {name: req.user.name, courses: courses, sections: sections})
})

router.get('/addcoursformat', async (req, res) => {
    res.render('cours_formats/addcoursformat.ejs')
})

router.post('/addcoursformats', async (req, res) => {
    try {
        const newCours = await new CoursFormats({
            name: req.body.name,
            description: req.body.des
        })
        await newCours.save()
        res.redirect(`/admin/coursformats/${newCours.id}`)
    } catch (e) {
        res.redirect('/admin/coursformats')
        console.log(e);
    }
})

router.get('/tests', async (req, res) => {
    const tests = await Test.find({})
    const questions = await Question.find({})

    //const category = await new Category({
    //    name: "החייאה"
    //})
    //await category.save()

    const newQuestion = await new Question({
        title: "מה התפקיד של החייאה",
        category: '63e16524f7c9f3048184158a',
        option1: "להציל חיים",
        option2: "לגרום ללב לפעול מחדש",
        option3: "להמשיך את פעילות המוח",
        option4: "להחזיר חיים",
        answer: 1
    })
    //await newQuestion.save()

    res.render('tests/tests.ejs', {name: req.user.name, tests: tests, questions: questions})
})

router.get('/questions/:id', async (req, res) => {
    const question = await Question.findById(req.params.id)
    const categorys = await Category.find()
    res.render('tests/question.ejs', {question: question, categorys: categorys})
})

router.get('/adduser', (req, res) => {
    res.render('users/adduser.ejs')
})

router.post('/adduser', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            identity: req.body.id,
            phone: req.body.phone,
            password: hashedPassword,
        })
        newUser.save()
        res.redirect('/admin')
    } catch (e) {
        res.redirect('/admin')
        console.log(e);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const courses = await Cours.find({ student: user.id })
        res.render('users/user.ejs', {user: user, courses: courses})
    } catch (e) {
        console.log(e);
    }
})

router.get('/:id/addcours', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const courses = await CoursFormats.find({})
        res.render('users/addcours.ejs', {user: user, courses: courses})
    } catch (e) {
        console.log(e);
    }
})

router.post('/:id/addcours', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const courses = await CoursFormats.find({})
        const cours = await CoursFormats.findById(req.body.cours)
        console.log(req.body.cours);
        res.redirect(`/admin/${user.id}`)
        const newCours = new Cours({
            name: cours.name,
            student: user.id,
            format: cours.id,
            progress: 0
        })
        console.log(newCours);
        newCours.save()
    } catch (e) {
        console.log(e);
    }
})

router.get('/tests/:id', async (req, res) => {
    try {
        const test = await Test.findById(req.params.id)
        const questions = await test.questions
        res.render('tests/test.ejs', {test: test, questions: questions})
    } catch (e) {
        console.log(e);
    }
})

router.get('/coursformats/addsection', async (req, res) => {
    try {
        res.render('cours_formats/add_section_format.ejs')
    } catch (e) {
        console.log(e);
    }
})

router.post('/add_section_format', upload.single('video') ,async (req, res) => {
    const filename = req.file != null ? req.file.filename : null
    try {
        const newSectionFormat = await new Sec({
            name: req.body.name,
            description: req.body.des,
            video: filename
        })
        await newSectionFormat.save(function(err) {
            if (err) {
                console.log(err);
            }
        })
        res.redirect('/admin/coursformats')
    } catch (e) {
        console.log(e);
    }
})

router.get('/coursformats/sections/:id', async (req, res) => {
    try {
        const section = await Sec.findById(req.params.id)
        const videoUrl = `data:${section.contentType};base64,${section.video.toString('base64')}`;

        res.render('cours_formats/sectionformat.ejs', { section: section, videoUrl: videoUrl})
    } catch (e) {
        console.log(e);
    }
})

router.get('/coursformats/:id', async (req, res) => {
    try {
        const cours = await CoursFormats.findById(req.params.id)
        const sections = await Section.find({ coursformat: req.params.id }).sort({order: 1})
        res.render('cours_formats/coursformat.ejs', {cours: cours, sections: sections})
    } catch (e) {
        console.log(e);
    }
})

router.get('/coursformats/:id/addsection', async (req, res) => {
    try {
        const cours = await CoursFormats.findById(req.params.id)
        const sections = await Sec.find()
        res.render('cours_formats/add_section.ejs', {cours: cours, sections: sections})
    } catch (e) {
        console.log(e)
    }
})

router.get('/coursformats/:id/edit', async (req, res) => {
    try {
        const cours = await CoursFormats.findById(req.params.id)
        const sections = await Section.find({ coursformat: req.params.id }).sort({order: 1})
        res.render('cours_formats/coursformatedit.ejs', {cours: cours, sections: sections})
    } catch (e) {
        console.log(e)
    }
})

router.put('/coursformats/:id/edit', async (req, res) => {
    try {
        const cours = await CoursFormats.findById(req.params.id)
        cours.name = req.body.name
        cours.description = req.body.email
        await cours.save()
        res.redirect(`/admin/coursformats/${cours.id}`)
    } catch (e) {
        console.log(e);
    }
})

router.get('/coursformats/:id/edit/:sec/addquiz', async (req, res) => {
    try {
        const cours = await CoursFormats.findById(req.params.id)
        const section = await cours.body.find({id: req.params.sec})
        res.render('cours_formats/addquiz.ejs', {cours: cours, section: section})
    } catch (e) {
        console.log(e)
    }
})

router.post('/coursformats/:id/edit/addquiz', async (req, res) => {
    try {
        const cours = await CoursFormats.findById(req.params.id)
        const section = await cours.body.find({id: req.params.sec})
        console.log({
            title: req.body.title,
            time: req.body.time,
            op1: req.body.op1,
            op2: req.body.op2,
            op3: req.body.op3,
            op4: req.body.op4
        });
        await section.quiz.push({
            title: req.body.title,
            time: req.body.time,
            op1: req.body.op1,
            op2: req.body.op2,
            op3: req.body.op3,
            op4: req.body.op4
        })
        await cours.save()
        res.redirect(`/admin/coursformats/${req.params.id}`)
    } catch (e) {
        console.log(e)
    }
})

router.delete('/coursformats/:id', async (req, res) => {
    let cours
    try {
        cours = await CoursFormats.findById(req.params.id)
        await cours.remove()
        res.redirect('/admin/coursformats')
    } catch {
        if (cours = null) {
            res.redirect('/admin/coursformats')
        } else {
            res.redirect(`/admin/coursformats/${cours.id}`)
        }
    }
})

router.post('/coursformats/:id/addsection/:sec', async (req, res) => {
    try {
        const cours = await CoursFormats.findById(req.params.id)
        if (req.params.sec == null || req.params.sec == undefined) {
            res.redirect(`/admin/coursformats/${req.params.id}`)
        } else {
            const sec = await Sec.findById(req.params.sec)
            const newSection = await new Section({
                name: sec.name,
                description: sec.description,
                format: sec.id,
                coursformat: req.params.id,
                order: 0
            })
            await newSection.save()
            console.log(newSection);
            res.redirect(`/admin/coursformats/${req.params.id}`)
        }

    } catch (e) {
        console.log(e);
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const courses = await Cours.find({ student: user.id })
        res.render('users/useredit.ejs', {user: user, courses: courses})
    } catch (e) {
        console.log(e);
    }
})

router.put('/:id/edit', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user.name = req.body.name
        user.email = req.body.email
        user.identity = req.body.id
        user.phone = req.body.phone
        await user.save()
        res.redirect(`/admin/${user.id}`)
    } catch (e) {
        console.log(e);
    }
})

router.delete('/:id', async (req, res) => {
    let user
    try {
        user = await User.findById(req.params.id)
        await user.remove()
        res.redirect('/admin')
    } catch {
        if (user = null) {
            res.redirect('/admin')
        } else {
            res.redirect(`/admin/${user.id}`)
        }
    }
})

module.exports = router