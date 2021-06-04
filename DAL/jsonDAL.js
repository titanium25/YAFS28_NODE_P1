const jsonFile = require("jsonfile");
const fileName = __dirname +  "/users.json";

exports.readUsers = () => {
    return new Promise((resolve, reject) => {
        jsonFile.readFile(fileName, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        });
    });
};