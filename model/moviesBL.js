const restDAL = require('../DAL/restDAL')
const jsonDAL = require('../DAL/jsonDAL')

exports.findMovie = async function(req) {
    const movies = await restDAL.getAllMovies()
    const title = req.body.title.toLowerCase();
    const genre = req.body.genres;
    const language = req.body.language;
    return movies.data.filter(item =>
        (item.name.toLowerCase().includes(title) || title == '') &&
        (item.language == language || language == '') &&
        (item.genres.includes(genre) || genre == '')
    )
}

exports.addMovie = async function(req) {
    const title = req.body.title.toLowerCase();
    const genre = req.body.genres;
    const language = req.body.language;
    let moviesArr = await jsonDAL.getMovies();
    let movies = moviesArr.movies
    let lastMovie = movies[movies.length - 1]
    let id = lastMovie.id + 1
    movies.push({
        id,
        title,
        language,
        genre
    })
    let response = await jsonDAL.saveMovie(moviesArr)
    return response;
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