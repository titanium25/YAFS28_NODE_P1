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
const saveNewUser = async function (obj) {

    let fullNameData = obj.firstName + ' ' + obj.lastName

    let resp = await restDAL.getUsers()
    let allUsers = resp.data;
    let userArr = allUsers.filter(x => x.name === fullNameData);

    if(userArr.length === 0){
        let userObj = {fullName: fullNameData}
        let status = await restDAL.saveUser(userObj)
        console.log(status.data)

        const objecCon = {id : 1, gender : obj.gender, adult : obj.adult? 'adult' : 'minor', city : obj.city }
        let response = await jsonDAL.saveJson(objecCon)

        return "User saved!";
    } else {
        return "User with that name exists!"
    }

}
exports.addMovie = async function(req) {
    const title = req.body.title.toLowerCase();
    const genre = req.body.genres;
    const language = req.body.language;
    const newMovieObj = {id : 1, title, language, genre}
    let response = await jsonDAL.saveMovie(newMovieObj)
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