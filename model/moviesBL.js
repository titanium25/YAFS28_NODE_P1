const restDAL = require('../DAL/restDAL')
const jsonDAL = require('../DAL/jsonDAL')

exports.findMovie = async function(req) {
    const moviesAPI = await restDAL.getAllMovies()
    const moviesJSON = await jsonDAL.getMovies()
    const name = req.body.title.toLowerCase();
    const genres = req.body.genres;
    const language = req.body.language;

    let movieREST = moviesAPI.data.filter(item =>
        (item.name.toLowerCase().includes(name) || name == '') &&
        (item.language == language || language == '') &&
        (item.genres.includes(genres) || genres == '')
    )
    let movieJSON = moviesJSON.movies.filter(item =>
        (item.name.toLowerCase().includes(name) || name == '') &&
        (item.language == language || language == '') &&
        (item.genres.includes(genres) || genres == '')
    )


        return movieREST.concat(movieJSON)

}

// TODO
// IF no genre in form - search for movie with same genre
//

// Search for
exports.findMovieByGenre = async function(req) {
    // const moviesJSON = await jsonDAL.getMovies();
    const movieAPI = await restDAL.getAllMovies()
    // let moviesArrJSON = moviesJSON.movies;
    const name = req.body.title.toLowerCase();

    let fa = movieAPI.data.filter(item => item.name.toLowerCase().includes(name))
    console.log(fa)

    let sa = fa[0].genres[0]
    console.log(sa)
    let findAllMoviesByGenre = movieAPI.data.filter(item => item.genres.includes(sa))
    // console.log(findAllMoviesByGenre) // TODO
    return findAllMoviesByGenre;
}

exports.addMovie = async function(req) {

    const {name, language, genres} = req.body
    let errors = [];

    // Check required fields
    if (!name) errors.push({msg: 'Please type movie title'});
    if (!language) errors.push({msg: 'Please choose movie language'});
    if (!genres) errors.push({msg: 'Please choose movie genre'});

    // Validation passed
    let success_msg;
    if (errors.length == 0) {
        const moviesJSON = await jsonDAL.getMovies();
        const moviesAPI = await restDAL.getAllMovies()
        const lastMovieAPI = moviesAPI.data

        let moviesArrJSON = moviesJSON.movies
        let lastMovie = moviesArrJSON[moviesArrJSON.length - 1]
        if (lastMovie === undefined)
            lastMovie = lastMovieAPI[lastMovieAPI.length - 1]
        let id = lastMovie.id + 1

        moviesArrJSON.push({
            id,
            name,
            language,
            genres
        })
        await jsonDAL.saveMovie(moviesJSON);
        return success_msg = 'Created!';
    }
    return errors;
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