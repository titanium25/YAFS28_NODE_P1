const restDAL = require('../DAL/restDAL')

exports.getAll = async function () {
    let movies = await restDAL.getShows();
    return movies.data.map(x => x.name);
}

exports.getTitle = async function (obj) {
    let shows = await restDAL.getShows();
    let title = obj.title;
    return shows.data.find(x => x.name === title);
}