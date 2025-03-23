import { Router } from "express";
import { itemService } from "../services/itemService.js";
import { getErrorMassage } from "../utils/errorUtils.js";
import { isAuth, validateObjectId } from "../middlewares/authMiddleware.js";
import { checkIsLiked, checkIsNotOwner, checkIsOwner } from "../middlewares/ownerMiddleware.js";

const routes = Router()

routes.get('/', async (req, res) => {
    try {
        const items = await itemService.getAll().lean()
        
        res.json(items)
    } catch (err) {
        res.status(400).json({ error: getErrorMassage(err) })
    }
})

routes.get('/create', async (req, res) => {
    res.status(204).end(); 
})

routes.post('/create', isAuth, async (req, res) => {
    console.log("User:", req.user);
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const item = req.body;
    const userId = req.user._id;

    try {
        const createdItem = await itemService.create(item, userId);
        res.json(createdItem);
    } catch (err) {
        res.status(400).json({ error: getErrorMassage(err) });
    }
});


routes.get('/:vehicleId', validateObjectId, async (req, res) => {

    const item = await itemService.getItem(req.params.itemId).lean()  
    
    const isOwner = item.owner == req.user?._id

    const isLiked = item.userList.some(userId => userId == req.user?._id)

    res.json({ item, isOwner, isLiked });

})

routes.delete('/:vehicleId/delete', validateObjectId, isAuth, checkIsOwner, async (req, res) => {

    const itemId = req.params.itemId 
    try {
        const item = await itemService.remove(itemId)
        res.json(item)
    } catch (err) {
        res.status(400).json({ error: getErrorMassage(err) });
    }

})

routes.put('/:vehicleId/edit', validateObjectId, isAuth, checkIsOwner, async (req, res) => {
    const itemId = req.params.itemId 
    const body = req.body
    try {
        const item = await itemService.edit(itemId, body)
        res.json(item)
    } catch (err) {
        res.status(400).json({ error: getErrorMassage(err) });
    }
})

routes.get('/:vehicleId/like', validateObjectId, checkIsNotOwner, checkIsLiked, isAuth, async (req, res) => {
    
    const itemId = req.params.itemId 
    const userId = req.user._id 

    try {
        const updatedItem = await itemService.like(itemId, userId)
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: getErrorMassage(err) });
    }
})

export default routes;