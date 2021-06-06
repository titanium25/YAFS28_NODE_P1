const restDAL = require('../DAL/restDAL')
const jsonDAL = require('../DAL/jsonDAL')
const getValue = value => (typeof value === 'string' ? value.toUpperCase() : value);

exports.findMovie = async function(req) {
    const movies = await restDAL.getAllMovies()
    const title = req.body.title;
    const genre = req.body.genres;
    const language = req.body.language;
    if (title.length > 0){
        return movies.data.filter(item => item.name === title);
    } else {
        return movies.data.filter(item => item.language === language && item.genres.indexOf(genre) > -1)
    }
}

exports.findMovieByTitle = async function (req) {
    const movies = await restDAL.getAllMovies()

    // let moviesFoundByTitle = moviesData.filter( movie => movie.name.toLowerCase().includes(chosenMovieName) );

    return movies.data.filter(item => item.name === req.body.title);
}

exports.findMovieByLanguage= async function (req) {
    const movies = await restDAL.getAllMovies()

    return movies.data.filter(item => item.language === req.body.language);
}

exports.findMovieByGenres= async function (req) {
    const movies = await restDAL.getAllMovies()

    return movies.data.filter(item => item.genres.indexOf(req.body.genres) > -1);
}
exports.findMovieById = async function (id) {
    const movie = await restDAL.getMovie(id)
    return movie.data;
}

exports.getGenres = async function () {
    const response = await jsonDAL.getGenres();
    return response.genres.sort()
}

exports.getLanguage = async function () {
    const response = await jsonDAL.getLanguage()
    return response.language.sort()
}