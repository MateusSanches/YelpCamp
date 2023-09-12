import Express  from "express";
import mongoose from "mongoose";
import Campground from './models/campground.js';


const app = Express();

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
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

app.get('/camp',async (req,res) => {
    const newCamp = new Campground({title: 'TEST CAMP', price: 50});
    await newCamp.save();
    res.send(newCamp);
});

app.listen(3000,()=>{
    console.log('Listening on port 3000');
});