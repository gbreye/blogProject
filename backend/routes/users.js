import express from 'express';
import rateLimit from 'express-rate-limit';
const router = express.Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 20 ,
    message: 'Muitas requisições criadas, tente novamente mais tarde.'
});



import auth from '../controllers/auth.js';


router.get('/', (req, res) => {
    res.send('Users route')
})

router.post('/signup', limiter, async (req, res) => {
    await auth.signup(req, res);
});

router.post('/login', limiter, async (req, res) => {
    await auth.login(req, res);
});

router.get('/dashboard', async(req, res) => {
    await dashboardController.getUserInfo(req, res);
});






export default router;