import express from 'express';
const router = express.Router();

import usersController from '../controllers/singupController.js'

router.get('/', (req, res) => {
    res.send('Users route')
})

router.post('/signup', async (req, res) => {
    await usersController.getForminformation(req, res);
});

export default router;