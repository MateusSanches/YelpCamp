
import Campground from "../models/campground.js";

export async function index  (req, res) {
    const camps = await Campground.find({});
    res.render('campgrounds/index.ejs',{camps});
}

export async function newForm (req, res) {
    res.render('campgrounds/new.ejs');
}

export async function showCamp(req, res) {
    const camp = await Campground.findById(req.params.id).populate({
        path:'reviews',
        populate: {
            path:'author'
        }
    }).populate('author');
    res.render('campgrounds/show.ejs',{camp});
}

export async function newCamp(req, res)  {
    const camp = new Campground(req.body.campground);
    camp.author = req.user._id;
    await camp.save();
    req.flash('success', 'Campground added!');
    res.redirect('/campground/'+camp._id);
}

export async function editCampForm (req, res) {
    const camp = await Campground.findById(req.params.id);
    res.render('campgrounds/edit.ejs', {camp});
}

export async function editCamp(req, res) {
    await Campground.findByIdAndUpdate(req.params.id,{...req.body.campground});
    req.flash('success', 'Campground updated!');
    res.redirect('/campground/' + req.params.id);
}

export async function deleteCamp(req, res)  {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campground');
}