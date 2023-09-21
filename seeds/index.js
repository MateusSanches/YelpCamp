import mongoose from 'mongoose';
import Campground from '../models/campground.js';
import * as seeds  from './cities.js';
import * as seedHelpers from './seedHelpers.js';

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',{
        useNewUrlParser: true,
        useUnifiedTopology: true
});


const db = mongoose.connection;
db.on('Error', console.error.bind(console,'connection error:'));
db.once('open',() => {
    console.log('Mongo Connected');
});

function randArray(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

const dbSeed = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){                       
        const camp = new Campground({
            location: randArray(seeds.cities).city + ', ' + randArray(seeds.cities).state,
            title: randArray(seedHelpers.descriptors) + ' ' + randArray(seedHelpers.places)
        });
        await camp.save();
    }
}

 dbSeed().then(() => {
    mongoose.connection.close();
    console.log('Db seeded');
 });

