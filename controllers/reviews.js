import Review from "../models/review.js";
import Campground from '../models/campground.js';

export async function newReview(req, res){
    const camp = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    camp.reviews.push(review);
    await camp.save();
    await review.save();
    res.redirect('/campground/'+camp._id);
}

export async function deleteReview(req, res){
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect('/campground/' + id);
}