import express from "express";
import { asyncCatcher } from '../utils/asyncCatcher.js';
import Campground from '../models/campground.js';
import {reviewSchema} from '../schemas.js'
import Review from '../models/review.js';
import { isLoggedIn } from "../utils/middleware.js";

const reviewRoutes = express.Router({mergeParams: true});

const validateReview = (req,res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        throw new expressError(error.details[0].message, 400);
    } else {
        next();
    }
};

reviewRoutes.post('/', validateReview, asyncCatcher(async (req, res)=>{
    const camp = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    camp.reviews.push(review);
    await camp.save();
    await review.save();
    res.redirect('/campground/'+camp._id);
    
}));

reviewRoutes.delete('/:reviewId', asyncCatcher(async (req, res)=>{
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect('/campground/' + id);
}));

export {reviewRoutes}