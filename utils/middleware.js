function isLoggedIn(req, res, next) {
    if(!req.isAuthenticated()){ 
        req.session.returnTo = req.originalUrl; // stopped here
        req.flash('error','Must be logged in');
        return res.redirect('/login');
    }
    next();
}

export {isLoggedIn};