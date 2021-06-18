const User = require('../model/User');
const bcrypt = require('bcryptjs');


exports.getAllUsers = function () {
    return new Promise((resolve, reject) => {
        User.find({}, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.getUser = function (id) {
    return new Promise((resolve, reject) => {
        User.findById(id, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.updateUser = function (req) {
    const {id, name, email, isAdmin} = req.body
    let errors = [];

    // Check required fields
    if (!name || !email) {
        errors.push({msg: 'Please dont leave blank fields'});
        return errors;
    } else {
        return new Promise((resolve, reject) => {
            User.findByIdAndUpdate(id, {
                name,
                email,
                isAdmin
            }, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(console.log('Updated!'))
                }
            })
        });
    }
}

exports.addUser = function (req, res) {
    const {name, email, password, isAdmin} = req.body
    return new Promise((resolve, reject) => {
        const newUser = new User({
            name,
            email,
            password,
            isAdmin
        });

        // Hash Password
        bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        reject(err);
                    } else {
                        newUser.password = hash;
                        newUser.save()
                        resolve(console.log('New User Created'))
                    }
                }
            ))
    })
}


exports.deleteUser = function (id) {
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(id, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(console.log('Deleted!'))
            }
        })
    })
}