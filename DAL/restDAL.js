const axios = require('axios')

const url = "https://jsonplaceholder.typicode.com/users/";

const getUsers = function () {
    return axios.get(url)
}

const getUser = function (id) {
    return axios.get(url + id)
}

module.exports = {getUsers, getUser}