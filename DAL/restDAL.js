const axios = require('axios')

const url = "https://api.tvmaze.com/shows";

const getShows = function () {
    return axios.get(url)
}

module.exports = {getShows}