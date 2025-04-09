import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    
    username: {
        type: String,
        required: [true, 'Username is required.'],
        minlength: [2, 'Username must be at least 2 characters long!']
    },

    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format.']
    },

    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required.'],
        match: [/^\+?\d{7,15}$/, 'Phone number must be between 7 and 15 digits!']
    },

    location: {
        type: String,
        required: [true, 'Location is required.'],
        minlength: [1, 'Location must be at least 2 character long!']
    },

    password: {
        type: String, 
        required: [true, 'Password is required.'],
        match: [/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number!'],
    },

    vehicles: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]

});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next();
});


const User = model('User', userSchema);

export default User;
