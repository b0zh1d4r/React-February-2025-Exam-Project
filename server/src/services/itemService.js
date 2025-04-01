import Item from "../models/Item.js";
import User from "../models/User.js";  // Import User model to update the user's vehicle list

export const itemService = {

    getAll(query = {}) {
        let items = Item.find();

        if (query.name) {
            items.find({ name: { $regex: query.name, options: 'i' } });
        }

        return items;
    },

    // Create item and add it to the user's vehicle list
    async create(data, ownerId) {
        // Create the new item (vehicle)
        const createdItem = await Item.create({ ...data, owner: ownerId });

        // Find the user by ID and add the newly created item to the user's vehicle list
        const user = await User.findById(ownerId);
        if (!user) {
            throw new Error('User not found');
        }

        // Add the created vehicle to the user's vehicles array
        user.vehicles.push(createdItem._id);
        await user.save();

        return createdItem;
    },

    edit(itemId, userId) {
        return Item.findByIdAndUpdate(itemId, userId, { runValidators: true });
    },

    remove(itemId) {
        return Item.findByIdAndDelete(itemId);
    },

    getItem(itemId) {
        return Item.findById(itemId);
    },

    getById(itemId) {
        return Item.findById(itemId).populate('userList');
    },

    like(itemId, userId) {
        return Item.updateOne(
            { _id: itemId },
            { $addToSet: { userList: userId } }
        );
    },

    undoLike(itemId, userId) {
        return Item.updateOne(
            { _id: itemId },
            { $pull: { userList: userId } }
        );
    },

    getByOwner(ownerId) {
        return Item.find({ owner: ownerId });
    },

    getLastThreeItems() {
        return Item.find().sort({ createdAt: -1 }).limit(3);
    },

    getTopThreeLikedItems() {
        const items = Item.find().populate('userList');

        const sortedItems = items
            .map(item => ({
                ...item.toObject(),
                likeCount: item.userList.length
            }))
            .sort((a, b) => b.likeCount - a.likeCount)
            .slice(0, 3);

        return sortedItems;
    },

    getUserCreatedItems(userId) {
        return Item.find({ owner: userId });
    },
};

export default itemService;
