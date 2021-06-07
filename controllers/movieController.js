var express = require('express');
var router = express.Router();

const movieBL = require('../model/moviesBL')

router.get('/', function(req, res, next) {
    res.render('menu', {});
});

router.get('/addMovie', async function(req, res, next) {
    let genreList = await movieBL.getGenres();
    let languageList = await movieBL.getLanguage()
    res.render('addMovie', {genreList, languageList});
});

router.get('/search', async function(req, res, next) {
    let genreList = await movieBL.getGenres();
    let languageList = await movieBL.getLanguage()
    res.render('search', {message : '', genreList, languageList});
});

router.post('/', async function(req, res, next) {
    let searchResults = await movieBL.findMovie(req)
    let genreList = await movieBL.getGenres();
    let languageList = await movieBL.getLanguage()
    let params = [req.body.title, req.body.language, req.body.genres]
    if(searchResults.length == 0){
        res.render('search', {message : 'Movie not found', genreList, languageList});
    } else {
        res.render('results', {movie : searchResults, params});
    }
});

router.get('/:id', async function(req, res, next) {
    let movieId = req.params.id;
    let movie = await movieBL.findMovieById(movieId);
    res.render('movie', {movie});
});



module.exports = router;