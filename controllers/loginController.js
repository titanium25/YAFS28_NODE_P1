var express = require('express');
var router = express.Router();

const loginBL = require('../model/loginBL')

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { message: ''});
});

router.post('/auth', async function(req, res, next) {
  let loginSuccess = await loginBL.authentication(req)
  if(loginSuccess) {
    req.session["authenticated"] = true;
    res.redirect('movie');
  } else {
    res.render('login', {message : 'Wrong username or password'});
  }
});

module.exports = router;
