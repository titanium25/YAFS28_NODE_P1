var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/signIn', function(req, res, next) {

    res.redirect('/menu');
});

module.exports = router;