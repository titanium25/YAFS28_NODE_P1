var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const {ensureGotCredits} = require('../config/credits');


const movieBL = require('../model/moviesBL')

// Menu page
router.get('/', ensureAuthenticated, function(req, res, next) {
    res.render('menu', {
        name: req.user.name,
        isAdmin: req.user.isAdmin,
        credits: req.session.credits
    });
});

router.get('/add', ensureAuthenticated, async function(req, res, next) {
    let genreList = await movieBL.getGenres();
    let languageList = await movieBL.getLanguage()
    res.render('addMovie', {genreList, languageList});
});

// Add New Movie Handler
router.post('/addForm', ensureAuthenticated, ensureGotCredits, async function(req, res, next) {
    const errors = await movieBL.addMovie(req)
    const {name} = req.body;
    if(typeof errors != 'undefined') {
        const genreList = await movieBL.getGenres();
        const languageList = await movieBL.getLanguage()
        res.render('addMovie', {
            errors,
            name,
            genreList,
            languageList});
    } else {
        req.flash('success_msg', `Movie "${name}" Added Successfully`);
        res.redirect('/menu/');
    }
});

// Search For Movie
router.get('/search', ensureAuthenticated, async function(req, res, next) {
    let genreList = await movieBL.getGenres();
    let languageList = await movieBL.getLanguage()
    res.render('search', {genreList, languageList});
});

// Search For Movie Handler
router.post('/search', ensureAuthenticated, ensureGotCredits, async function(req, res, next) {
    let searchResults = await movieBL.findMovie(req)
    let params = [req.body.name, req.body.language, req.body.genres]


    if(params.every( val => val === '' )){
        req.flash('error_msg', 'Please choose one or more search parameters');
        res.redirect('/menu/search');
    } else if(searchResults.length == 0){
        req.flash('error_msg', 'Movie not found');
        res.redirect('/menu/search');
    } else {
        let searchGeneres = await movieBL.findMovieByGenre(req)
        res.render('results', {searchResults, searchGeneres, params});
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
    // req.session.destroy();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});

module.exports = router;