import mongoose from "mongoose";
import Review from "./review.js";
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

CampgroundSchema.post('findOneAndDelete', async(doc) => {
    if(doc){
        console.log(doc);
        await Review.deleteMany({
            _id:{$in:doc.reviews}
        });
    }
});

export default mongoose.model('Campground', CampgroundSchema);