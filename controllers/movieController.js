var express = require('express');
var router = express.Router();

const movieBL = require('../model/moviesBL')

router.get('/', function(req, res, next) {
    res.render('menu', {});
});

router.get('/add', async function(req, res, next) {
    let genreList = await movieBL.getGenres();
    let languageList = await movieBL.getLanguage()
    res.render('addMovie', {message : '', genreList, languageList});
});

router.post('/addForm', async function(req, res, next) {
    let saveMovie = await movieBL.addMovie(req)
    let genreList = await movieBL.getGenres();
    let languageList = await movieBL.getLanguage()
    res.render('addMovie', {message : saveMovie, genreList, languageList});
});

router.get('/search', async function(req, res, next) {
    let genreList = await movieBL.getGenres();
    let languageList = await movieBL.getLanguage()
    let passedVariable = req.query.valid;
    res.render('search', {message : passedVariable, genreList, languageList});
});

router.post('/search', async function(req, res, next) {
    let searchResults = await movieBL.findMovie(req)
    let params = [req.body.title, req.body.language, req.body.genres]
    console.log(params)


    if(params.every( val => val === '' )){
        let message = encodeURIComponent('Please choose one or more search parameters')
        res.redirect('/search?valid=' + message);
    } else
    if(searchResults.length == 0){
        let message = encodeURIComponent('Movie not found')
        res.redirect('/search?valid=' + message);
    } else {
        let searchGeneres = await movieBL.findMovieByGenre(req)
        res.render('results', {movie : searchResults, genres : searchGeneres, params});
    }


});

router.get('/search/:id', async function(req, res, next) {
    let movieId = req.params.id;
    let movie = await movieBL.findMovieById(movieId);
    res.render('movie', {movie, lastId : 250});
});



module.exports = router;