var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('menu', {});
});

router.get('/search', function(req, res, next) {
    res.render('search');
});

router.post('/s', function(req, res, next) {
  console.log(req.body.title)
  res.send('OK');
});

module.exports = router;
