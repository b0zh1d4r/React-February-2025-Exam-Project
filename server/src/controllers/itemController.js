import { Router } from "express";
import { itemService } from "../services/itemService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isAuth, validateObjectId } from "../middlewares/authMiddleware.js";
import { checkIsOwner } from "../middlewares/ownerMiddleware.js";

const routes = Router();

// Route to fetch all items:
routes.get('/', async (req, res) => {
    try {
        // Fetch all items from the database:
        const items = await itemService.getAll().lean();
        // Return the list of items as a JSON response:
        res.json(items);
    } catch (err) {
        // If there's an error, return an error message with a 400 status code:
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

// Route to serve the create item page (for authorized users):
routes.get('/create', async (req, res) => {
    res.status(204).end(); // No content.
});

// POST route to create a new item:
routes.post('/create', async (req, res) => {
    if (!req.user) {
        // If the user is not authenticated, return an "Unauthorized" error:
        return res.status(401).json({ error: "Unauthorized" });
    }

    const item = req.body;
    const userId = req.user._id;

    try {
        // Create a new item using the itemService:
        const createdItem = await itemService.create(item, userId);
        // Return the created item as a JSON response:
        res.json(createdItem);
    } catch (err) {
        // If there's an error, return an error message with a 400 status code:
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

// GET route to fetch a single item by its ID:
routes.get('/:vehicleId', validateObjectId, async (req, res) => {
    try {
        // Fetch the item by its vehicleId from the database:
        const item = await itemService.getItem(req.params.vehicleId).lean();
        
        // Check if the current user is the owner of the item:
        const isOwner = item?.owner == req.user?._id;
        
        // Check if the current user has liked the item:
        const isLiked = item?.userList.some(userId => userId == req.user?._id);
        
        // Return the item, ownership status, and liked status as a JSON response:
        res.json({ item, isOwner, isLiked });
    } catch (err) {
        // Handle errors and return a 400 status with the error message:
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

// DELETE route to remove an item by its ID (only for item owners):
routes.delete('/:vehicleId', validateObjectId, isAuth, checkIsOwner, async (req, res) => {
    const vehicleId = req.params.vehicleId;

    try {
        // Attempt to remove the item using itemService:
        const item = await itemService.remove(vehicleId);
        // Return the removed item as a JSON response:
        res.json(item);
    } catch (err) {
        // If there's an error, return an error message with a 400 status code:
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

// PUT route to edit an item by its ID (only for item owners):
routes.put('/:vehicleId/edit', validateObjectId, isAuth, checkIsOwner, async (req, res) => {
    const vehicleId = req.params.vehicleId;
    const body = req.body;

    try {
        // Attempt to edit the item using itemService:
        const item = await itemService.edit(vehicleId, body);
        // Return the edited item as a JSON response:
        res.json(item);
    } catch (err) {
        // If there's an error, return an error message with a 400 status code:
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

// GET route to like an item (only for authenticated users):
routes.get('/:vehicleId/like', isAuth, async (req, res) => {
    const vehicleId = req.params.vehicleId;
    const userId = req.user._id;

    try {
        // Attempt to like the item using itemService:
        const updatedItem = await itemService.like(vehicleId, userId);
        // Return the updated item as a JSON response:
        res.json(updatedItem);
    } catch (err) {
        // If there's an error, return an error message with a 400 status code:
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

// GET route to undo like an item (only for authenticated users):
routes.get('/:vehicleId/undoLike', isAuth, async (req, res) => {
    const vehicleId = req.params.vehicleId;
    const userId = req.user._id;

    try {
        // Attempt to undo like the item
        const updatedItem = await itemService.undoLike(vehicleId, userId);
         // Return the updated item as a JSON response:
        res.json(updatedItem);
    } catch (err) {
        // If there's an error, return an error message with a 400 status code:
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

export default routes;
