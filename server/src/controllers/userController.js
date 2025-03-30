import { Router } from "express";
import { getUserById, getAllUsers } from "../services/authService.js";
import { checkIfUser } from "../middlewares/authMiddleware.js";

const userController = Router();

userController.get('/me', checkIfUser, (req, res) => {
    try {
        res.json(req.user);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ error: "Failed to retrieve user data" });
    }
});

userController.get('/all', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        console.error("Error fetching all users:", err);
        res.status(500).json({ error: "Failed to retrieve users" });
    }
});

userController.get('/all/:userId', async (req, res) => {
    try {
        const user = await getUserById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error(`Error fetching user with ID ${req.params.userId}:`, err);
        res.status(500).json({ error: "Failed to retrieve user" });
    }
});

export default userController;
