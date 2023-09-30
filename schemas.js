import joi from "joi";

const campgroundSchema = joi.object({
    campground: joi.object({
        title: joi.string().required(),
        price: joi.number().required().min(0),
        description: joi.string().required(),
        image: joi.string().required()
    }).required()
});

export {campgroundSchema};