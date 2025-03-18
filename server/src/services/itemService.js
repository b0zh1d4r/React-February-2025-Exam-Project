import Item from "../models/Item.js"

export const itemService = {

    getAll(query = {}) {
        let items = Item.find();

        if (query.name) {
            items.find({ name: { $regex: query.name, options: 'i' } });
        }

        return items;
    },

    create(data, ownerId) {
        return Item.create({ ...data, owner: ownerId });
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

// async getTopThreeRatedItems() {
//         const items = await Item.find().populate('userList'); // Fetch all items with their likes
//         if (items.length === 0) return []; // Return empty array if no items exist

//         // Calculate like count for each item
//         const itemsWithLikes = items.map(item => ({
//             ...item.toObject(),
//             likeCount: item.userList.length // Count likes
//         }));

//         // Find max likes for scaling
//         const maxLikes = Math.max(...itemsWithLikes.map(item => item.likeCount)) || 1; // Avoid division by zero

//         // Assign a rating (1-10 scale)
//         const ratedItems = itemsWithLikes.map(item => ({
//             ...item,
//             rating: Math.max(1, Math.round((item.likeCount / maxLikes) * 10)) // Scale to 1-10
//         }));

//         // Sort by rating (descending) and return top 3
//         return ratedItems.sort((a, b) => b.rating - a.rating).slice(0, 3);
// }