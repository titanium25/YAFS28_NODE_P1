const jsonFile = require("jsonfile");
const fileNameGenres = __dirname +  "/genresList.json";
const fileNameLanguage = __dirname +  "/languageList.json";

exports.getGenres = () => {
    return new Promise((resolve, reject) => {
        jsonFile.readFile(fileNameGenres, (err, res) => {
            if (err) {
                reject(err);
            };
            resolve(res);
        });
    });
};

exports.getLanguage = () => {
    return new Promise((resolve, reject) => {
        jsonFile.readFile(fileNameLanguage, (err, res) => {
            if (err) {
                reject(err);
            };
            resolve(res);
        });
    });
};