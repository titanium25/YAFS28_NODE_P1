var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

const usersBL = require('../model/usersBL')

// TODO: only admin can access this route

// Users Manager console
router.get('/', ensureAuthenticated, async function(req, res, next) {
    let userList = await usersBL.getAllUsers();
    res.render('manageUsers', {userList});
});

// Edit User
router.get('/edit/:id', ensureAuthenticated, async function(req, res, next) {
    let id = req.params.id;
    let user = await usersBL.getUser(id)
    res.render('editUser', {user});
});

// Edit User Handler
// TODO: success message
router.post('/editUserForm', ensureAuthenticated, async function(req, res, next) {
    let errors = await usersBL.updateUser(req)
    let user = await usersBL.getUser(req.body.id)
    res.render('editUser', {user, errors});
});

// Delete User
// TODO: success message
router.get('/delete/:id', ensureAuthenticated, async function(req, res, next) {
    let id = req.params.id;
    await usersBL.deleteUser(id)
    let userList = await usersBL.getAllUsers();
    res.render('manageUsers', {userList});
});

// Add User
router.get('/addUser', ensureAuthenticated, function(req, res, next) {
    res.render('addUser');
});

// Add User Handler
// TODO: move addUser logic from loginController to usersBL
router.post('/addUser', ensureAuthenticated, async function(req, res, next) {
    // let user = usersBL.
    res.render('addUser');
});

module.exports = router;