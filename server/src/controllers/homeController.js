import { Router } from 'express';

const homeController = Router()

homeController.get('/', (req, res) => {
    res.status(204).end();
});

export default homeController