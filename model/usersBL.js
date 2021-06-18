const User = require('../model/User')

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


//TODO: move logic from controller to BL
exports.addUser = function (obj) {
    return new Promise((resolve, reject) => {
        let per = new User({
            name: obj.name,
            Age: obj.Age,
        });

        per.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve('Created')
            }
        })
    });
}

exports.deleteUser = function (id){
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