module.exports = {
    ensureIsAdmin: function (req, res, next) {
        if(req.user.isAdmin) {
            return next();
        }
        req.flash('error_msg', 'Access only for Admins');
        res.redirect('/menu');
    }
}