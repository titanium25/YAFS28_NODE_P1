const axios = require('axios')

const url = "https://api.tvmaze.com/shows";

const getShows = function () {
    return axios.get(url)
}

const getShow = function (id) {
    return axios.get(url + '/' +id)
}

module.exports = {getShows, getShow}