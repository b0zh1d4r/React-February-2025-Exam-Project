import { itemService } from "../services/itemService.js";

export const checkIsOwner = async (req, res, next) => {
    const itemId = req.params.itemId; 
    const item = await itemService.getItem(itemId).lean();

    if (item.owner == req.user?._id){
        return next();
    }

    res.status(403).json({ message: 'Not authorized!' });
}

export const checkIsNotOwner = async (req, res, next) => {
    const itemId = req.params.itemId;
    const item = await itemService.getItem(itemId).lean();

    if (item.owner != req.user?._id){
        return next();
    }

    res.status(403).json({ message: 'Not authorized!' });
}

export const checkIsLiked = async (req, res, next) => {
    const itemId = req.params.itemId;
    const userId = req.user._id;

    try {
        const item = await itemService.getItem(itemId);

        if (item.userList.includes(userId)) {
            return res.status(204).send();
        }

        next();
    } catch (err) {
        res.status(403).json({ message: 'Not authorized!' });
    }
}