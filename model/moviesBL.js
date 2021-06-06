const restDAL = require('../DAL/restDAL')
const getValue = value => (typeof value === 'string' ? value.toUpperCase() : value);

exports.findMovie = async function (req) {
    let movies = await restDAL.getShows();
    return movies.data.find(x => x.name === req.body.title);
}

