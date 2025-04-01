import { Router } from "express";
import { getUserById, getAllUsers } from "../services/authService.js";
import { checkIfUser } from "../middlewares/authMiddleware.js";

const userController = Router();

// Route to fetch the current user's data:
userController.get('/me', checkIfUser, (req, res) => {
    try {
        res.json(req.user); // Return user data.
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve user data" }); // Handle errors.
    }
});

// Route to fetch all users:
userController.get('/all', async (req, res) => {
    try {
        const users = await getAllUsers(); // Get all users.
        res.json(users); // Return all users as JSON.
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve users" }); // Handle errors.
    }
});

// Route to fetch a user by their ID:
userController.get('/all/:userId', async (req, res) => {
    try {
        const user = await getUserById(req.params.userId); // Get user by ID.
        if (!user) {
            return res.status(404).json({ error: "User not found" }); // Handle if user doesn't exist.
        }
        res.json(user); // Return user data
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve user" }); // Handle errors.
    }
});

export default userController;
