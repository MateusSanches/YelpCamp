import mongoose from 'mongoose';

import Campground from '../models/campground.js';

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',{
        useNewUrlParser: true,
        useUnifiedTopology: true
});


const db = mongoose.connection;
db.on('Error', console.error.bind(console,'connection error:'));
db.once('open',() => {
    console.log('Mongo Connected');
});


const dbDelete = async () => {
    await Campground.deleteMany({});
    const c = new Campground({title: 'Strawberry Fields'});
    await c.save();
}

