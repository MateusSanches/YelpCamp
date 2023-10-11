import express from "express";
import { asyncCatcher } from '../utils/asyncCatcher.js';
import Campground from '../models/campground.js';
import { isLoggedIn ,isCampOwner, validateCampground } from "../utils/middleware.js";

const campgroundRoutes = express.Router();

campgroundRoutes.get('/', async (req, res, ) => {
    const camps = await Campground.find({});
    res.render('campgrounds/index.ejs',{camps});
});

campgroundRoutes.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new.ejs');
});

campgroundRoutes.get('/:id', async (req, res) => {
    const camp = await Campground.findById(req.params.id).populate({
        path:'reviews',
        populate: {
            path:'author'
        }
    }).populate('author');
    res.render('campgrounds/show.ejs',{camp});
});

campgroundRoutes.post('/', isLoggedIn, isCampOwner, validateCampground, asyncCatcher(async (req, res) => {
    // if(!req.body.campground) throw new expressError('Missing info', 400);
    const camp = new Campground(req.body.campground);
    camp.author = req.user._id;
    await camp.save();
    req.flash('success', 'Campground added!');
    res.redirect('/campground/'+camp._id);
}));

campgroundRoutes.get('/edit/:id', isLoggedIn, isCampOwner, async (req, res)=>{
    const camp = await Campground.findById(req.params.id);
    res.render('campgrounds/edit.ejs', {camp});
});

campgroundRoutes.put('/:id', isLoggedIn, isCampOwner, validateCampground, asyncCatcher(async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id,{...req.body.campground});
    req.flash('success', 'Campground updated!');
    res.redirect('/campground/' + req.params.id);
}));

campgroundRoutes.delete('/:id', async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campground');
});



export {campgroundRoutes}