var express = require('express');
var router = express.Router();

const loginBL = require('../model/loginBL')

router.get('/', function(req, res, next) {
    res.render('login', { message: ''});
});

router.post('/signIn', async function(req, res, next) {
    let loginSuccess = await loginBL.authentication(req)
    if(loginSuccess) {
        req.session["authenticated"] = true;
        res.redirect('menu');
    } else {
        res.render('login', {message : 'Wrong username or password'});
    }
});

module.exports = router;