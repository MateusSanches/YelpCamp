import express  from 'express';
import mongoose from 'mongoose';
import ejsMate from 'ejs-mate';
import methodOverride from 'method-override';
import Campground from './models/campground.js';
import campground from './models/campground.js';


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



app.get('/campground', async (req, res) => {
    const camps = await Campground.find({});
    res.render('campgrounds/index.ejs',{camps});
});

app.get('/campground/new', (req, res) => {
    res.render('campgrounds/new.ejs');
});


app.get('/campground/:id',async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    res.render('campgrounds/show.ejs',{camp});
});


app.post('/campground',async (req, res) => {
    const camp = new Campground(req.body.campground);
    await camp.save();
    res.redirect('/campground/'+camp._id);
});

app.get('/campground/edit/:id', async (req, res)=>{
    const camp = await Campground.findById(req.params.id);
    res.render('campgrounds/edit.ejs', {camp});
});

app.patch('/campground/:id', async (req, res) => {
    await campground.findByIdAndUpdate(req.params.id,{...req.body.campground});
    res.redirect('/campground/' + req.params.id);
});

app.delete('/campground/:id', async (req, res) => {
    await campground.findByIdAndDelete(req.params.id);
    res.redirect('/campground');
});

app.listen(3000,()=>{
    console.log('Listening on port 3000');
});

