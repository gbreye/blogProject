import express from 'express';
import rateLimit from 'express-rate-limit';
const router = express.Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 20 ,
    message: 'Muitas requisições criadas, tente novamente mais tarde.'
});



import usersController from '../controllers/singupController.js'
import loginController from '../controllers/loginController.js'
import dashboardController from '../controllers/dashboardController.js';



router.get('/', (req, res) => {
    res.send('Users route')
})

router.post('/signup', limiter, async (req, res) => {
    await usersController.getForminformation(req, res);
});

router.post('/login', limiter, async (req, res) => {
    await loginController.getValidation(req, res);
});

router.get('/dashboard', async(req, res) => {
    await dashboardController.getUserInfo(req, res);
});






export default router;