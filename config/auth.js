module.exports = {
    ensureAdminAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log(req.isAuthenticated)
            return next();
        }
    
        res.redirect('/auth/adminLogin')
    },

}