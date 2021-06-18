var express = require('express');
var router = express.Router();

const loginBL = require('../model/loginBL');
const bcrypt = require('bcryptjs');
// User model
const User = require('../model/User');
// Passport
const passport = require('passport')

// Login page
router.get('/', function (req, res, next) {

    res.render('login');
});

// Register page
router.get('/register', function (req, res, next) {
    res.render('register');
});

// Register Handler
router.post('/registerForm', function (req, res, next) {
    const {name, email, password, password2} = req.body
    let errors = [];

    // Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({msg: 'Please fill in all fields'});
    }

    // Check password match
    if (password !== password2) {
        errors.push({msg: 'Password do not match'})
    }

    // Check pass length
    if (password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters'})
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        // Validation passed
        User.findOne({email: email})
            .then(user => {
                if (user) {
                    // User exists
                    errors.push({msg: 'Email is already registered'})
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password,
                        isAdmin : false
                    });

                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            // Set Password to Hashed
                            newUser.password = hash;
                            // Save User
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in')
                                    res.redirect('/');
                                })
                                .catch(err => console.log(err))
                        }
                    ))
                }
            })
    }

});

// Login handle
router.post('/signIn', async function (req, res, next) {
    passport.authenticate('local', {
        successRedirect : '/menu',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next)
});

module.exports = router;