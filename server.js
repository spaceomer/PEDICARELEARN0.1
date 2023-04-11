//prodacson -----------------------------------
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()   
}


//configs-----------------------------------
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const port = process.env.PORT || 3000
const DB = process.env.DATABASE
const expressLayouts = require('express-ejs-layouts')
const Cours = require('./models/cours')
const User = require('./models/user')
const Roll = require('./models/roll')
const Coursformat = require('./models/coursFormats')
const { render } = require('ejs')
const usersRouter = require('./routes/usersRouter')
const adminRouter = require('./routes/adminRouter')
const studentRouter = require('./routes/studentRouter')
const bodyParser = require('body-parser')


//user_system | downloads
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const passportLocal = require('passport-local')
const initializePassport = require('./passport-config')
const methodOverride = require('method-override')

initializePassport(passport)

//setting ----------------------------------
dotenv.config({ path: './config.env'})
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(expressLayouts) 
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.set('layout', 'layouts/layout')
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
//pages ----------------------------------------------
app.use('/admin', checkAuthenticated, adminRouter)
app.use('/mycourses', checkAuthenticated, studentRouter)

app.get('/', checkAuthenticated, async (req, res) => {
    const courses = await Cours.find({student: req.user.id}) 
    res.render('index.ejs', { name: req.user.name, courses: courses})
})

app.get('/login', checkNotAuthenticated, async (req, res) => {
    res.render('login')
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

app.delete('/logout', (req, res, next) => {
    req.logOut(function(err) {
        if(err) {return next(err)}
        res.redirect('/login') 
    })   
})

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    } 
    res.redirect('/login')
}
function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) { 
        return res.redirect('/')
    } 
    next()
}


//CONNECTIONS----------------------------------

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://Oxer:MiyWEwkRXVUtQVJb@learnpedicaredatabase.xxjf7ed.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("DATABASE CONNECTED");  
})
.catch((err) => {
    console.log(err);
})
 
app.listen(port, () => {
    console.log("THE APP IS UP AND RUNING");
})

