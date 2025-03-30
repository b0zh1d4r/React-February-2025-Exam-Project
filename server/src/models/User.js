import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [3, 'Username must be at least 3 characters long']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },

    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required!'],
        match: [/^\+?\d{7,15}$/, 'Invalid phone number format!']
    },

    location: {
        type: String,
        required: [true, 'Location is required!'],
        minlength: [3, 'Location must be at least 3 characters long!']
    },

    password: {
        type: String, 
        required: [true, 'Password is required!'],
        match: [/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number!']
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
