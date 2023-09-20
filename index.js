import Express  from 'express';
import mongoose from 'mongoose';
import Campground from './models/campground.js';


const app = Express();

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',{
        useNewUrlParser: true,
        useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('Error', console.error.bind(console,'connection error:'));
db.once('open',() => {
    console.log('Mongo Connected');
});

app.set('views','./views');
app.set('view engine', 'ejs');

app.get('/campground', async (req, res) => {
    const camps = await Campground.find({});
    res.render('index.ejs',{camps});
});

app.get('/campground/:id',async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    res.render('show.ejs',{camp});
});

app.get('/campground/new',(req, res) => {
    res.send('hiya'); // here be the problem
});

app.listen(3000,()=>{
    console.log('Listening on port 3000');
});

