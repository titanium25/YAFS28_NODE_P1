var express = require('express');
var router = express.Router();

const movieBL = require('../model/moviesBL')

router.get('/', function(req, res, next) {
    res.render('menu', {});
});

router.get('/all', function(req, res, next) {
    let movies = movieBL.getAll()
    console.log(movies)
    res.send('OK');
});

// router.get('/search', function(req, res, next) {
//     res.render('search', {message : ''});
// });
//
// router.post('/s', function(req, res, next) {
//     let movie = movieBL.getTitle(req)
//     if(movie == undefined){
//         res.render('search', {message : 'Movie not found'});
//     }
//     res.render('movie', {movie});
// });

module.exports = router;
