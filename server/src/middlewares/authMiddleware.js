import { AUTH_COOKIE_NAME } from "../constants.js";
import jwt from "../lib/jwt.js";
import { Types } from 'mongoose';

// Middleware to authenticate user and attach user info to request:
export const authMiddleware = async (req, res, next) => {

    const token = req.cookies[AUTH_COOKIE_NAME]; // Get the authentication token from cookies.

    if (!token) { // If no token is present, skip the authentication process:
        return next(); 
    }

    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET); // Verify the token and decode the user data.

        req.user = decodedToken; // Attach the decoded user data to the request object.
        req.isAuthenticated = true; // Mark the request as authenticated.

        res.locals.user = decodedToken; // Make user data available in response locals.
        res.locals.isAuthenticated = true; // Make authentication status available in response locals.

        next(); // Call the next middleware in the stack.

    } catch (err) { 
        res.clearCookie(AUTH_COOKIE_NAME); // If token is invalid or expired, clear the cookie.
        res.redirect('/auth/login'); // Redirect to login page.
    }
}

export const checkIfUser = async (req, res, next) => {
    const token = req.cookies?.[AUTH_COOKIE_NAME]; // Get token from cookies if it exists.

    if (!token) { // If no token, explicitly set user to null:
        req.user = null;
        return next(); 
    }

    try {
        req.user = await jwt.verify(token, process.env.JWT_SECRET); // Verify and attach user data if token is valid.
    } catch { 
        req.user = null; // If token is invalid, set user to null:
    }

    next(); // Call the next middleware.
};

export const isAuth = (req, res, next) => {

    if (!req.user) { // If no user is attached to the request, redirect to login:
        return res.redirect('/auth/login');
    }

    next(); // Continue to the next middleware if authenticated.
}

export const isGuest = (req, res, next) => {

    if (!req.isAuthenticated) { // If user is not authenticated, continue to next middleware:
        return next(); 
    }

    res.redirect('/'); // Redirect to homepage if the user is already authenticated.
}

export const validateObjectId = (req, res, next) => {
    const { vehicleId } = req.params; // Get vehicleId from route parameters.

    if (!Types.ObjectId.isValid(vehicleId.trim())) { // Check if vehicleId is a valid MongoDB ObjectId:
        return res.status(400).json({ error: 'Invalid item ID format!' }); // Return error if invalid.
    }

    next(); // Proceed to the next middleware.
};
