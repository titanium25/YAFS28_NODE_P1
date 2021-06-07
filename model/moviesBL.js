const restDAL = require('../DAL/restDAL')
const jsonDAL = require('../DAL/jsonDAL')

exports.findMovie = async function (req) {
    const movies = await restDAL.getAllMovies()
    const title = req.body.title.toLowerCase();
    let genre = req.body.genres;
    const language = req.body.language;
    return movies.data.filter(item =>
        (item.name.toLowerCase().includes(title) || item.name == '') &&
        (item.language == language || item.language == '') &&
        (item.genres.includes(genre) || item.genres == '')
    )
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