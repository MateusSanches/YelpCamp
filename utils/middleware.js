import Campground from "../models/campground.js";
import {reviewSchema, campgroundSchema} from '../schemas.js'
import review from "../models/review.js";

function isLoggedIn(req, res, next) {
    if(!req.isAuthenticated()){ 
        req.session.returnTo = req.originalUrl;
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

async function isReviewOwner(req, res, next){
    const reviewId = req.params.reviewId;
    const r = await review.findById(reviewId);
    if(!r.author.equals(req.user._id)){
        req.flash('Not authorized!');
        return res.redirect('/campground');
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

const validateReview = (req,res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        throw new expressError(error.details[0].message, 400);
    } else {
        next();
    }
};

const validateCampground = (req, res, next) =>{
    const {error} = campgroundSchema.validate(req.body);
    if(error){ 
        throw new expressError(error.details[0].message, 400);
    } else {
        next();
    }
};

export {isLoggedIn, storeReturnTo, isCampOwner, validateReview, validateCampground, isReviewOwner};