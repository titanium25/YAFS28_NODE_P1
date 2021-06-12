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

exports.findMovieByGenre = async function(req) {
    // const moviesJSON = await jsonDAL.getMovies();
    const movieAPI = await restDAL.getAllMovies()
    // let moviesArrJSON = moviesJSON.movies;
    const name = req.body.title.toLowerCase();

    let fa = movieAPI.data.filter(item => item.name.toLowerCase().includes(name))
    // let sa = fa[3]
    console.log(fa) // TODO
    return movieAPI.data.filter(item => item.genres.includes(fa))
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