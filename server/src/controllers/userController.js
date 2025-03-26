import { Router } from "express";
import { checkIfUser } from "../middlewares/authMiddleware.js";
import { getUserById } from "../services/authService.js";

const userController = Router();

userController.get('/', checkIfUser, (req, res) => {
    res.json(req.user);
});

userController.get('/:id', checkIfUser, async (req, res) => {
    try {
        const user = await getUserById(req.params.id);        
        res.json(user);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

export default userController;
