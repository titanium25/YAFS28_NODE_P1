const restDAL = require('../DAL/restDAL')
const jsonDAL = require('../DAL/jsonDAL')


exports.findMovie = async function (req) {
    const {name, language, genres} = req.body
    const allMoviesAPI = await restDAL.getAllMovies()
    const allMoviesJSON = await jsonDAL.getMovies()

    let movieREST = allMoviesAPI.data.filter(item =>
        (item.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase() == '') &&
        (item.language == language || language == '') &&
        (item.genres.includes(genres) || genres == '')
    )
    let movieJSON = allMoviesJSON.movies.filter(item =>
        (item.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase() == '') &&
        (item.language == language || language == '') &&
        (item.genres.includes(genres) || genres == '')
    )
    return movieREST.concat(movieJSON)
}

// TODO
// IF no genre in form - search for movie with same genre
//

// Search for
exports.findMovieByGenre = async function (req) {
    const allMoviesJSON = await jsonDAL.getMovies();
    const allMoviesAPI = await restDAL.getAllMovies()
    const name = req.body.name.toLowerCase();
    let findInAPI = allMoviesAPI.data.filter(item => item.name.toLowerCase().includes(name))
    let findInJSON = allMoviesJSON.movies.filter(item => item.name.toLowerCase().includes(name))
    let concat = findInAPI.concat(findInJSON)
    let sameGenresFound1 = concat[0].genres[0]
    let sameGenresFound2 = concat[0].genres[1]
    let sameGenresFound3 = concat[0].genres[2]
    let findAllMoviesByGenre = allMoviesAPI.data.filter(item => item.genres.includes(sameGenresFound1 && sameGenresFound2 && sameGenresFound3))
    return findAllMoviesByGenre;
}

exports.addMovie = async function (req) {
    const {name, language, genres} = req.body
    let errors = [];

    // Check required fields
    if (!name || !language || !genres) {
        if (!name) errors.push({msg: 'Please type movie title'});
        if (!language) errors.push({msg: 'Please choose movie language'});
        if (!genres) errors.push({msg: 'Please choose movie genre'});
        return errors
    } else {
        // Validation passed
        const allMoviesJSON = await jsonDAL.getMovies();
        const allMoviesAPI = await restDAL.getAllMovies();
        const allMoviesJSONData = allMoviesJSON.movies;
        const allMoviesAPIData = allMoviesAPI.data;

        // Search for last ID
        let lastMovie = allMoviesJSONData[allMoviesJSONData.length - 1]
        if (lastMovie === undefined)
            lastMovie = allMoviesAPIData[allMoviesAPIData.length - 1]
        let id = lastMovie.id + 1

        allMoviesJSONData.push({
            id,
            name,
            language,
            genres
        })
        await jsonDAL.saveMovie(allMoviesJSON);
    }
}

exports.findMovieById = async function (id) {
    const moviesJSON = await jsonDAL.getMovies();
    const movieAPI = await restDAL.getMovie(id)
    let moviesArrJSON = moviesJSON.movies;
    let lastMovie = moviesArrJSON[moviesArrJSON.length - 1];

    return id < lastMovie.id ? movieAPI.data : moviesArrJSON.find(item => item.id == id);
}

exports.getGenres = async function () {
    const response = await jsonDAL.getGenres();
    return response.genres.sort()
}

exports.getLanguage = async function () {
    const response = await jsonDAL.getLanguage()
    return response.language.sort()
}