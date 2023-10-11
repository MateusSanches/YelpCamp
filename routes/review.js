import express from "express";
import { asyncCatcher } from '../utils/asyncCatcher.js';
import { validateReview, isLoggedIn, isReviewOwner} from "../utils/middleware.js";
import * as reviewControl from '../controllers/reviews.js';

const reviewRoutes = express.Router({mergeParams: true});

reviewRoutes.post('/', isLoggedIn, validateReview, asyncCatcher(reviewControl.newReview));

reviewRoutes.delete('/:reviewId', isLoggedIn, isReviewOwner, asyncCatcher(reviewControl.deleteReview));

export {reviewRoutes}