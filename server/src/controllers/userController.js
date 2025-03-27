import { Router } from "express";
import { getUserById, getAllUsers } from "../services/authService.js";

const userController = Router();

// Get all users
userController.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

userController.get('/:userId', async (req, res) => {
    try {
        const user = await getUserById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

export default userController;

