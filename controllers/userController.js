var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const {ensureIsAdmin} = require('../config/isAdmin');

const usersBL = require('../model/usersBL')

// Users Manager console
router.get('/', ensureAuthenticated, ensureIsAdmin, async function(req, res, next) {
    let userList = await usersBL.getAllUsers();
    res.render('manageUsers', {userList});
});

// Edit User
router.get('/edit/:id', ensureAuthenticated, ensureIsAdmin, async function(req, res, next) {
    let id = req.params.id;
    let user = await usersBL.getUser(id)
    res.render('editUser', {user});
});

// Edit User Handler
router.post('/editUserForm', ensureAuthenticated, ensureIsAdmin, async function(req, res, next) {
    let errors = await usersBL.updateUser(req);
    let user = await usersBL.getUser(req.body.id);
    if(typeof errors != 'undefined'){
        res.render('editUser', {user, errors});
    } else {
        req.flash('success_msg', `User ${user.name} Edited Successfully`);
        res.redirect('/menu/manage');
    }
});

// Delete User
router.get('/delete/:id', ensureAuthenticated, ensureIsAdmin, async function(req, res, next) {
    let id = req.params.id;
    let user = await usersBL.getUser(id)
    await usersBL.deleteUser(id);
    req.flash('success_msg', `User ${user.name} Deleted`);
    res.redirect('/menu/manage');
});

// Add User
router.get('/addUser', ensureAuthenticated, ensureIsAdmin, function(req, res, next) {
    res.render('addUser');
});

// Add User Handler
router.post('/addUserForm', ensureAuthenticated, ensureIsAdmin, async function(req, res, next) {
    await usersBL.addUser(req);
    req.flash('success_msg', `User ${req.body.name} Added Successfully`);
    res.redirect('/menu/manage');
});

module.exports = router;