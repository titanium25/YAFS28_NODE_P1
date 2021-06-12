const restDAL = require('../DAL/restDAL')
const jsonDAL = require('../DAL/jsonDAL')

exports.findMovie = async function(req) {
    const movies = await restDAL.getAllMovies()
    const moviesJSON = await jsonDAL.getMovies()
    const title = req.body.title.toLowerCase();
    const genre = req.body.genres;
    const language = req.body.language;
    // let movieREST = movies.data.filter(item =>
    //     (item.name.toLowerCase().includes(title) || title == '') &&
    //     (item.language == language || language == '') &&
    //     (item.genres.includes(genre) || genre == '')
    // )

    return moviesJSON.movies.filter(item =>
        (item.title.toLowerCase().includes(title) || title == '') &&
        (item.language == language || language == '') &&
        (item.genre.includes(genre) || genre == '')
    )

    // return movieREST.concat(movieJSON)
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
        const moviesArr = await jsonDAL.getMovies();
        const moviesAPI = await restDAL.getAllMovies()
        const last = moviesAPI.data

        let movies = moviesArr.movies
        let lastMovie = movies[movies.length - 1]
        if(lastMovie === undefined) lastMovie = last[last.length - 1]
        let id = lastMovie.id + 1

        movies.push({
            id,
            name,
            language,
            genres
        })
        let response = await jsonDAL.saveMovie(moviesArr)
        return response;
    }

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