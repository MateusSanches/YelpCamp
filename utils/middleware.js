import Campground from "../models/campground.js";

function isLoggedIn(req, res, next) {
    if(!req.isAuthenticated()){ 
        req.session.returnTo = req.originalUrl; // stopped here
        req.flash('error','Must be logged in');
        return res.redirect('/login');
    }
    next();
}

async function isCampOwner(req, res, next){
    const id = req.params.id;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error', 'You dont have permission to do that.');
        return res.redirect('/campground/' + campground._id);
    } else {
        next();
    }
}

function storeReturnTo(req, res, next){
    if(req.session.returnTo){
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

export {isLoggedIn, storeReturnTo, isCampOwner};