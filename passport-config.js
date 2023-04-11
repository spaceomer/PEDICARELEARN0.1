const LocalStrategy = require('passport-Local').Strategy
const bcrypt = require('bcrypt')
const e = require('method-override')
const User = require('./models/user')

async function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        User.findOne({ email }, (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) { return done(err); }
                if (!isMatch) { return done(null, false); }
                return done(null, user);
            });
        });
    }

    passport.use(new LocalStrategy({ usernameField: 'email' },
    authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            if (err) { return done(err) }
            done(null, user);
        });
    })

}

module.exports = initialize