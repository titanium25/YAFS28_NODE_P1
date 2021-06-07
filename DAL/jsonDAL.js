const jsonFile = require("jsonfile");
const fileNameGenres = __dirname +  "/genresList.json";
const fileNameLanguage = __dirname +  "/languageList.json";
const fileNameMovie = __dirname + "/movie.json"

exports.saveMovie = (obj) => {
    return new Promise((resolve, reject) => {
        jsonFile.writeFile(fileNameMovie, obj, { flag: 'a' }, function (err) {
            if (err){
                reject(err);
            } else {
                resolve("Created!");
            }
        })
    })
}

exports.getGenres = () => {
    return new Promise((resolve, reject) => {
        jsonFile.readFile(fileNameGenres, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
};

exports.getLanguage = () => {
    return new Promise((resolve, reject) => {
        jsonFile.readFile(fileNameLanguage, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
};