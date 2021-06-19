module.exports = {
    ensureGotCredits: function (req, res, next) {
        if (!req.user.isAdmin) {
            if (req.session.credits > 0) {
                req.session.credits -= 1;
                return next();
            }
            req.flash('error_msg', 'You got no credits left');
            res.redirect('/menu');
        } else {
            return next();
        }
    }
}