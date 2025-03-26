import { Schema, model, Types } from "mongoose";

const itemSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Name field is required!'],
        minLength: [2, 'Name must be at least 2 characters long!']
    },

    year: {
        type: Number,
        required: [true, 'Year field is required'],
        min: [1884, 'Year must be equal or more than 1884th!']
    },

    price: {
        type: Number,
        required: [true, 'Price field is required!'],
        min: [0, 'Price must be a positive number!']
    },

    imageUrl: {
        type: String,
        required: [true, 'Image field is required!'],
    },

    description: {
        type: String,
        required: [true, 'Description field is required!'],
        minLength: [10, 'Description must be at least 10 characters long!']
    },

    engine: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric'],
        required: true
    },

    condition: {
        type: String,
        enum: ['New', 'Used'],
        required: true
    },

    transmission: {
        type: String,
        enum: ['Manual', 'Automatic', 'Semi-Automatic'],
        required: true
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