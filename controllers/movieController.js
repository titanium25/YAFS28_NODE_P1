var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require('../config/auth');


const movieBL = require('../model/moviesBL')

// Menu page
router.get('/', ensureAuthenticated, function(req, res, next) {
    res.render('menu', {
        name: req.user.name,
        isAdmin: req.user.isAdmin,
    });
});

router.get('/add', ensureAuthenticated, async function(req, res, next) {
    let genreList = await movieBL.getGenres();
    let languageList = await movieBL.getLanguage()
    res.render('addMovie', {genreList, languageList});
});

// Add New Movie Handler
router.post('/addForm', ensureAuthenticated, async function(req, res, next) {
    let saveMovie = await movieBL.addMovie(req)
    let genreList = await movieBL.getGenres();
    let languageList = await movieBL.getLanguage()

    res.render('addMovie', {errors : saveMovie, genreList, languageList});
});

router.get('/search', ensureAuthenticated, async function(req, res, next) {
    let genreList = await movieBL.getGenres();
    let languageList = await movieBL.getLanguage()
    let passedVariable = req.query.valid;
    res.render('search', {message : passedVariable, genreList, languageList});
});

router.post('/search', ensureAuthenticated, async function(req, res, next) {
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

router.get('/search/:id', ensureAuthenticated, async function(req, res, next) {
    let movieId = req.params.id;
    let movie = await movieBL.findMovieById(movieId);
    res.render('movie', {movie, lastId : 250});
});


// Logout Handle
router.get('/logout', function(req, res, next) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});

module.exports = router;