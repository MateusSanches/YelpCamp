import User from "../models/user.js";

export function newUserForm (req, res){
    res.render('users/newUser.ejs');
}

export async function newUser (req, res, next) {
    try {
        const {email, username, password} = req.body;
        const user = new User({email: email, username: username});
        const newUser = await User.register(user, password);
        req.login(newUser, err => {
            if (err) return next(err);
            req.flash('success','Welcome to Yelp-Camp!');
            res.redirect('/campground');
        });
        
    } catch (e) {
        req.flash('error','' + e.message);
        res.redirect('/register');
    }
}

export async function loginUserForm(req,res) {
    res.render('users/login.ejs');
}

export async function loginUser(req,res) {
    req.flash('success','Logged in');
    const redirectUrl = res.locals.returnTo || '/campground'
    req.session.returnTo = null;
    res.redirect(redirectUrl);
}

export async function logoutUser (req, res) {
    
    req.logout(  (err) => {
        if (err) {
            return next(err);
        }
        req.flash('success','Logged out');
        res.redirect('/campground');
    });
    
}