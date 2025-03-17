import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    
    email: {
        type: String,
        required: [true, 'Email is required'],
    },

    password: {
        type: String, 
        required: [true, 'Password is required'],
    }

}) 

userSchema.pre('save', async function(){

    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hash;

})

const User = model('User', userSchema);

export default User;