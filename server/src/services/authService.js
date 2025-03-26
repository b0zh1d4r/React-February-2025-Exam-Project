import jwt from "../lib/jwt.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt';

export const authService = {

    async register(username, email, phoneNumber, location, password, repeatPassword) {
        try {
            const existingUser = await User.findOne({ email });
    
            if (existingUser) {
                throw new Error("User with this email already exists!");
            }
    
            if (password !== repeatPassword) {
                throw new Error("Passwords do not match!");
            }
    
            const newUser = await User.create({
                username,
                email,
                phoneNumber,
                location,
                password
            });
    
            return { 
                token: await this.generateToken(newUser), 
                _id: newUser._id, 
                email: newUser.email 
            };
    
        } catch (err) {
            throw err; // This will be caught by `authController`
        }
    },
    

    async login(email, password){
        const user = await User.findOne({ email });
        
        if (!user){
            throw new Error('Invalid user or password!');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid){
            throw new Error('Invalid user or password!');
        }

        return { 
            token: await this.generateToken(user), 
            _id: user._id, 
            email: user.email 
        };

    },

    async generateToken(user) {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing from environment variables!");
        }
    
        const payload = {
            _id: user._id,
            email: user.email
        };
    
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
    }
    

}

export const getUserById = async (id) => {
    let user = await User.findById(id);

    return user.email;
}

export const getAllUsersByIds = async (ids) => {
    let users = await User.find({ _id: { $in: ids } });

    return users.map(userId => userId.email);

}

export default authService;