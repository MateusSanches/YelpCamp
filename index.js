import express  from 'express';
import session from 'express-session';
import flash from 'connect-flash';
import mongoose from 'mongoose';
import ejsMate from 'ejs-mate';
import methodOverride from 'method-override';
import { expressError } from './utils/expressError.js'
import morgan from 'morgan';
import {campgroundRoutes} from './routes/campground.js'
import { reviewRoutes } from './routes/review.js';
import passport from 'passport';
import localpassport from 'passport-local';
import User from './models/user.js'
import { userRoutes } from './routes/users.js';

const sessionConfig = {
    secret: 'password',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 *7,
        maxAge: 1000 * 60 * 60 * 24 *7
    }
}


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(session(sessionConfig));
app.use(flash());


// passport stuff ---------------
app.use(passport.initialize());
app.use(passport.session()); // add after session config
passport.use(new localpassport(User.authenticate())); // local strategy
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 
//-------------------------

app.use(morgan('dev'));

app.engine('ejs', ejsMate);
app.set('views','./views');
app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',{
        useNewUrlParser: true,
        useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('Error', console.error.bind(console,'connection error:'));
db.once('open',() => {
    console.log('Mongo Connected');
});

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.get('/fakeUser',  async (req, res) => {
    const user = new User({email: 'haha@gmail.com', username: 'me'});
    const newUser = await User.register(user, 'password');
    res.send(newUser);
});



// ----------- ROUTES ----------------
app.use('/', userRoutes);
app.use('/campground', campgroundRoutes);
app.use('/campground/:id/review', reviewRoutes);
// -----------------------------------

app.all('*', (req,res,next)=>{
    next(new expressError('Page not Found',404));
});

app.use((err,req,res,next)=>{
    const {message = 'Something went fucky wucky', statusCode = 500} = err;
    console.log(err.message + err.statusCode);
    res.status(statusCode).render('error.ejs',{err});
});

app.listen(3000,()=>{
    console.log('Listening on port 3000');
});

