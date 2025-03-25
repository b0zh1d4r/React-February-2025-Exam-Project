import { Router } from 'express';
import authService from '../services/authService.js';
import { AUTH_COOKIE_NAME } from '../constants.js';
import { getErrorMassage } from '../utils/errorUtils.js';
import { isAuth, isGuest } from '../middlewares/authMiddleware.js';

const authController = Router();

authController.get('/register', isGuest, (req, res) => {
    res.status(204).end(); 
});

authController.post('/register', isGuest, async (req, res) => {
    console.log("🔵 Register request received:", req.body);

    try {
        const { token, _id, email: userEmail } = await authService.register(
            req.body.username,
            req.body.email,
            req.body.phoneNumber,
            req.body.location,
            req.body.password,
            req.body.repeatPassword
        );

        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });

        console.log("✅ User registered successfully:", { _id, userEmail });

        res.json({ token, _id, email: userEmail });

    } catch (err) {
        console.error("❌ Registration failed:", err); // This prints full error details

        res.status(409).json({ error: err.message || "Registration failed!" });
    }
});

authController.get('/login', isGuest, (req, res) => {
    res.status(204).end(); 
});

authController.post('/login', isGuest, async (req, res) => {
    try {
        const { email, password } = req.body;

        const { token, _id, email: userEmail } = await authService.login(email, password);

        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });

        res.json({ token, _id, email: userEmail });

    } catch (err) {
        res.status(400).json({ error: getErrorMassage(err) });
    }
});

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.status(204).end();
})

export default authController;