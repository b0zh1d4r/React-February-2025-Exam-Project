import Item from "../models/Item.js"

export const itemService = {

    getAll(query = {}){
        let items = Item.find()

        if(query.name){
            items.find({ name: { $regex: query.name, options: 'i' } })
        }

        return items
    },

    create(data, ownerId){
        return Item.create({ ...data, owner: ownerId })
    },

    edit(itemId, userId){
        return Item.findByIdAndUpdate(itemId, userId, { runValidators: true })
    },

    remove(itemId){
        return Item.findByIdAndDelete(itemId)
    },

    getItem(itemId){
        return Item.findById(itemId)
    },

    getById(itemId){
        return Item.findById(itemId).populate('userList')
    },

    like(itemId, userId){
        return Item.updateOne(
            { _id: itemId },
            { $addToSet: { userList: userId } }
        )
    },

    getByOwner(ownerId) {
        return Item.find({ owner: ownerId });
    }

}