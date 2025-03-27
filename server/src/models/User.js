import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    
    username: {
        type: String,
        required: [true, 'Username is required'],
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
    },

    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
    },

    location: {
        type: String,
        required: [true, 'Location is required'],
    },

    password: {
        type: String, 
        required: [true, 'Password is required'],
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
