import express  from 'express';
import mongoose from 'mongoose';
import ejsMate from 'ejs-mate';
import methodOverride from 'method-override';
import { expressError } from './utils/expressError.js'
import morgan from 'morgan';
import {campgroundRoutes} from './routes/campground.js'
import { reviewRoutes } from './routes/review.js';


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

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

app.use(morgan('dev'));

app.use('/campground', campgroundRoutes);
app.use('/campground/:id/review', reviewRoutes);


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

