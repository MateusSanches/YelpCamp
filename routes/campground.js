import express from "express";
import { asyncCatcher } from '../utils/asyncCatcher.js';
import { isLoggedIn ,isCampOwner, validateCampground } from "../utils/middleware.js";
import * as campControl from "../controllers/campgrounds.js";

const campgroundRoutes = express.Router();

campgroundRoutes.get('/', campControl.index);

campgroundRoutes.get('/new', isLoggedIn, campControl.newForm);

campgroundRoutes.get('/:id', campControl.showCamp);

campgroundRoutes.post('/', isLoggedIn, validateCampground, asyncCatcher(campControl.newCamp));

campgroundRoutes.get('/edit/:id', isLoggedIn, isCampOwner, campControl.editCampForm);

campgroundRoutes.put('/:id', isLoggedIn, isCampOwner, validateCampground, asyncCatcher(campControl.editCamp));

campgroundRoutes.delete('/:id',isLoggedIn, isCampOwner, campControl.deleteCamp);


export {campgroundRoutes}