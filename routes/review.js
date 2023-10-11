import express from "express";
import { asyncCatcher } from '../utils/asyncCatcher.js';
import Campground from '../models/campground.js';
import Review from '../models/review.js';
import { validateReview, isLoggedIn, isReviewOwner} from "../utils/middleware.js";

const reviewRoutes = express.Router({mergeParams: true});


reviewRoutes.post('/', isLoggedIn, validateReview, asyncCatcher(async (req, res)=>{
    const camp = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    camp.reviews.push(review);
    await camp.save();
    await review.save();
    res.redirect('/campground/'+camp._id);
    
}));

reviewRoutes.delete('/:reviewId', isLoggedIn, isReviewOwner, asyncCatcher(async (req, res)=>{
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect('/campground/' + id);
}));

export {reviewRoutes}