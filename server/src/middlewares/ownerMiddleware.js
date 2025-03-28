import { itemService } from "../services/itemService.js";

export const checkIsOwner = async (req, res, next) => {
    try {

        const vehicleId = req.params.vehicleId; 
        const vehicle = await itemService.getItem(vehicleId).lean();

        if (!vehicle) {
            return res.status(404).json({ message: "Item not found!" });
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized! Please log in." });
        }

        if (vehicle.owner.toString() === req.user._id.toString()) {
            return next();
        }

        res.status(403).json({ message: "Not authorized!" });
    } catch (err) {
        console.error("Error in checkIsOwner:", err);
        res.status(500).json({ message: "Server error!" });
    }
};

export const checkIsNotOwner = async (req, res, next) => {
    try {
        const itemId = req.params.itemId;
        const item = await itemService.getItem(itemId).lean();

        if (!item) {
            return res.status(404).json({ message: "Item not found!" });
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized! Please log in." });
        }

        if (item.owner.toString() !== req.user._id.toString()) {
            return next();
        }

        res.status(403).json({ message: "Not authorized!" });
    } catch (err) {
        console.error("Error in checkIsNotOwner:", err);
        res.status(500).json({ message: "Server error!" });
    }
};

export const checkIsLiked = async (req, res, next) => {
    try {
        const itemId = req.params.itemId;
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized! Please log in." });
        }

        const item = await itemService.getItem(itemId);

        if (!item) {
            return res.status(404).json({ message: "Item not found!" });
        }

        if (item.userList.includes(userId)) {
            return res.status(204).send();
        }

        next();
    } catch (err) {
        console.error("Error in checkIsLiked:", err);
        res.status(500).json({ message: "Server error!" });
    }
};
