const jsonDAL = require('../DAL/jsonDAL')

exports.authentication = async (req) => {
    let resp = await jsonDAL.getUsers()
    return resp.users.find(x => x.login == req.body.login && x.password == req.body.password)
};

