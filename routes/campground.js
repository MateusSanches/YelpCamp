import express from "express";
import { asyncCatcher } from '../utils/asyncCatcher.js';
import { isLoggedIn ,isCampOwner, validateCampground } from "../utils/middleware.js";
import * as campControl from "../controllers/campgrounds.js";

const campgroundRoutes = express.Router();

campgroundRoutes.route('/')
    .get( campControl.index)
    .post( isLoggedIn, validateCampground, asyncCatcher(campControl.newCamp));

campgroundRoutes.get('/new', isLoggedIn, campControl.newForm);

campgroundRoutes.route('/:id')
    .get( campControl.showCamp)
    .put( isLoggedIn, isCampOwner, validateCampground, asyncCatcher(campControl.editCamp))
    .delete( isLoggedIn, isCampOwner, campControl.deleteCamp);

campgroundRoutes.get('/edit/:id', isLoggedIn, isCampOwner, campControl.editCampForm);


export {campgroundRoutes}