import { Router } from 'express';
import authService from '../services/authService.js';
import { AUTH_COOKIE_NAME } from '../constants.js';
import { getErrorMessage } from '../utils/errorUtils.js';
import { isAuth, isGuest } from '../middlewares/authMiddleware.js';

const authController = Router();

// Route to serve the registration page (only for guests):
authController.get('/register', isGuest, (req, res) => {
    res.status(204).end(); 
});

// POST route for user registration:
authController.post('/register', isGuest, async (req, res) => {
    try {
        // Register the user and get the necessary details:
        const { token, _id, email: userEmail } = await authService.register(
            req.body.username,
            req.body.email,
            req.body.phoneNumber,
            req.body.location,
            req.body.password,
            req.body.repeatPassword
        );

        // Set the authentication token in a cookie for secure access:
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });

        // Respond with the user's details:
        res.json({ token, _id, email: userEmail });

    } catch (err) {
        // In case of an error during registration, send an appropriate error message:
        res.status(409).json({ error: err.message || "Registration failed!" });
    }
});

// Route to serve the login page (only for guests):
authController.get('/login', isGuest, (req, res) => {
    res.status(204).end(); 
});

// POST route for user login:
authController.post('/login', isGuest, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Authenticate the user and retrieve the necessary details:
        const { token, _id, email: userEmail } = await authService.login(email, password);

        // Set the authentication token in a cookie for secure access:
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });

        // Respond with the user's details:
        res.json({ token, _id, email: userEmail });

    } catch (err) {
        // If there's an error during login, send an error response:
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

// Route to log out the user (only if authenticated):
authController.get('/logout', isAuth, (req, res) => {
    // Clear the authentication cookie and respond with a successful status:
    res.clearCookie(AUTH_COOKIE_NAME);
    res.status(204).end();
});

export default authController;
