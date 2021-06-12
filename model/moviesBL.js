const restDAL = require('../DAL/restDAL')
const jsonDAL = require('../DAL/jsonDAL')

exports.findMovie = async function(req) {
    const movies = await restDAL.getAllMovies()
    const moviesJSON = await jsonDAL.getMovies()
    const name = req.body.title.toLowerCase();
    const genres = req.body.genres;
    const language = req.body.language;
    let movieREST = movies.data.filter(item =>
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

exports.addMovie = async function(req) {
    const name = req.body.title;
    const genres = req.body.genres;
    const language = req.body.language;

    if(name.length == 0 ) {
        return "Please type movie title"
    }
    if (language.length == 0) {
        return "Please choose movie language"
    }
    if(genres == undefined){
        return "Please choose movie genre"
    } else {
        const moviesJSON = await jsonDAL.getMovies();
        const moviesAPI = await restDAL.getAllMovies()
        const lastMovieAPI = moviesAPI.data

        let moviesArrJSON = moviesJSON.movies
        let lastMovie = moviesArrJSON[moviesArrJSON.length - 1]
        if(lastMovie === undefined)
            lastMovie = lastMovieAPI[lastMovieAPI.length - 1]
        let id = lastMovie.id + 1

        moviesArrJSON.push({
            id,
            name,
            language,
            genres
        })
        let response = await jsonDAL.saveMovie(moviesJSON)
        return response;
    }

}

exports.findMovieById = async function (id) {
    const moviesJSON = await jsonDAL.getMovies();
    let moviesArrJSON = moviesJSON.movies;
    let lastMovie = moviesArrJSON[moviesArrJSON.length - 1];
    if(id < lastMovie.id){
        const movie = await restDAL.getMovie(id)
        return movie.data;
    } else {
        const movie = await jsonDAL.getMovies()
        return movie.movies.find(item => item.id == id);
    }

}

exports.getGenres = async function () {
    const response = await jsonDAL.getGenres();
    return response.genres.sort()
}

exports.getLanguage = async function () {
    const response = await jsonDAL.getLanguage()
    return response.language.sort()
}