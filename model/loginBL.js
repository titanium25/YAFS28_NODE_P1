const jsonDAL = require('../DAL/jsonDAL')

exports.authentication = async (req) => {
    let resp = await jsonDAL.readUsers();
    return resp.users.find(x => x.user === req.body.userName && x.pass === req.body.password)
};

