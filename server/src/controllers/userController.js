import { Router } from "express";
import { checkIfUser } from "../middlewares/authMiddleware.js";

const userController = Router();

userController.get('/', checkIfUser, (req, res) => {
    res.json(req.user); 
});

export default userController;