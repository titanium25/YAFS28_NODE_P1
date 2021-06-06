var express = require('express');
var router = express.Router();

const movieBL = require('../model/moviesBL')

router.get('/', function(req, res, next) {
    res.render('menu', {});
});


router.get('/search', function(req, res, next) {
    res.render('search', {message : ''});
});

router.post('/s', async function(req, res, next) {
    let movie = await movieBL.findMovie(req)
    if(movie === undefined){
        res.render('search', {message : 'Movie not found'});
    } else {
        res.render('searchResult', {movie});}
});

module.exports = router;
