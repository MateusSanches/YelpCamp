import  express  from "express";
import User from "../models/user.js";
import { asyncCatcher } from "../utils/asyncCatcher.js";
import passport from "passport";

const userRoutes = express.Router({mergeParams: true});

userRoutes.get('/register', (req, res)=>{
    res.render('users/newUser.ejs');
});

userRoutes.post('/register', asyncCatcher(async (req, res)=>{
    try {
        const {email, username, password} = req.body;
        const user = new User({email: email, username: username});
        const newUser = await User.register(user, password);
        req.flash('success','Welcome to Yelp-Camp!');
        res.redirect('/campground');
    } catch (e) {
        req.flash('success','' + e.message);
        res.redirect('/register');
    }
}));

userRoutes.get('/login', asyncCatcher(async(req,res) => {
    res.render('users/login.ejs');
}));

userRoutes.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}), asyncCatcher(async(req,res) => {
    req.flash('success','Logged in');
    res.redirect('/campground');
}));

export {userRoutes}