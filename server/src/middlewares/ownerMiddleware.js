import { itemService } from "../services/itemService.js";

// Middleware to check if the user is the owner of the vehicle:
export const checkIsOwner = async (req, res, next) => {
    try {

        const vehicleId = req.params.vehicleId; // Get vehicleId from route parameters,
        const vehicle = await itemService.getItem(vehicleId).lean(); // Fetch the vehicle from the database.

        if (!vehicle) { // If vehicle does not exist, return a 404 error:
            return res.status(404).json({ message: "Item not found!" });
        }

        if (!req.user || !req.user._id) { // If no user or user ID is missing, return 401 Unauthorized:
            return res.status(401).json({ message: "Unauthorized! Please log in." });
        }

        if (vehicle.owner.toString() === req.user._id.toString()) { // If user is the owner, proceed:
            return next();
        }

        res.status(403).json({ message: "Not authorized!" }); // If user is not the owner, return 403 Forbidden:
    } catch (err) {
        console.error("Error in checkIsOwner:", err); // Log the error for debugging.
        res.status(500).json({ message: "Server error!" }); // Return server error if something goes wrong.
    }
};

// Middleware to check if the user is not the owner of the item:
export const checkIsNotOwner = async (req, res, next) => {
    try {
        const itemId = req.params.itemId; // Get itemId from route parameters.
        const item = await itemService.getItem(itemId).lean(); // Fetch the item from the database.

        if (!item) { // If item does not exist, return a 404 error:
            return res.status(404).json({ message: "Item not found!" });
        }

        if (!req.user || !req.user._id) { // If no user or user ID is missing, return 401 Unauthorized:
            return res.status(401).json({ message: "Unauthorized! Please log in." });
        }

        if (item.owner.toString() !== req.user._id.toString()) { // If user is not the owner, proceed:
            return next();
        }

        res.status(403).json({ message: "Not authorized!" }); // If user is the owner, return 403 Forbidden:
    } catch (err) {
        console.error("Error in checkIsNotOwner:", err); // Log the error for debugging.
        res.status(500).json({ message: "Server error!" }); // Return server error if something goes wrong.
    }
};

// Middleware to check if the user has liked the item:
export const checkIsLiked = async (req, res, next) => {
    try {
        const itemId = req.params.itemId; // Get itemId from route parameters.
        const userId = req.user?._id; // Get user ID from request object (if user is authenticated).

        if (!userId) { // If no user is logged in, return 401 Unauthorized.
            return res.status(401).json({ message: "Unauthorized! Please log in." });
        }

        const item = await itemService.getItem(itemId); // Fetch the item from the database.

        if (!item) { // If item does not exist, return a 404 error:
            return res.status(404).json({ message: "Item not found!" });
        }

        if (item.userList.includes(userId)) { // If the user has already liked the item, return a 204 No Content response:
            return res.status(204).send(); 
        }

        next(); // If user has not liked the item, proceed to the next middleware.
    } catch (err) {
        console.error("Error in checkIsLiked:", err); // Log the error for debugging.
        res.status(500).json({ message: "Server error!" }); // Return server error if something goes wrong.
    }
};
