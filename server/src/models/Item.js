import { Schema, model, Types } from "mongoose";

const itemSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        minLength: [2, 'Name must be at least 2 characters long!']
    },

    year: {
        type: Number,
        required: [true, 'Year is required.'],
        min: [1886, 'Enter a valid year.'],
        max: [new Date().getFullYear(), 'Enter a valid year.']
    },

    price: {
        type: Number,
        required: [true, 'Price is required.'],
        min: [0, 'Price must be a positive number!']
    },

    imageUrl: {
        type: String,
        required: [true, 'Image URL is required.'],
        match: [/^https?:\/\/.+/, 'Enter a valid Image URL (starting with http/https).'],
    },
    

    description: {
        type: String,
        required: [true, 'Description is required.'],
        minLength: [10, 'Description must be at least 10 characters long.']
    },

    engine: {
        type: String,
        required: [true, 'Engine is required.'],
        minLength: [2, 'Engine must be at least 2 characters long!']
    },

    condition: {
        type: String,
        required: [true, 'Condition is required.'],
        minLength: [2, 'Condition must be at least 2 characters long!']
    },

    transmission: {
        type: String,
        required: [true, 'Transmission is required.'],
        minLength: [2, 'Transmission must be at least 2 characters long!']
    },

    userList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],

    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }

})

const Item = model('Item', itemSchema);

export default Item;