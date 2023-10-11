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
        const p = Math.floor(Math.random() * 50)  + 10;                   
        const camp = new Campground({
            author: '65244d6d6f944a833569ef57', 
            location: randArray(seeds.cities).city + ', ' + randArray(seeds.cities).state,
            title: randArray(seedHelpers.descriptors) + ' ' + randArray(seedHelpers.places),
            image: 'https://source.unsplash.com/collection/483251',
            description:'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Quem num gosta di mim que vai caçá sua turmis! Leite de capivaris, leite de mula manquis sem cabeça. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.',
            price: p
        });
        await camp.save();
    }
}

 dbSeed().then(() => {
    mongoose.connection.close();
    console.log('Db seeded');
 });

