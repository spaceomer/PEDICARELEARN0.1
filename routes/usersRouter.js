const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Cours = require('../models/cours')
const session = require('express-session')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { render } = require('ejs')

// Render the login template when the user navigates to /login
router.get('/login', (req, res) => {
    res.render('login');
});
  
// Handle the login form submission
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.redirect('/login');
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.redirect('/');
      });
    })(req, res, next);
});

module.exports = router