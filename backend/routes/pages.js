import express from 'express';
import rateLimit from 'express-rate-limit';
const router = express.Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 20 ,
    message: 'Muitas requisições criadas, tente novamente mais tarde.'
});

import pageController from '../controllers/pageController';

router.get('/', (req, res) => {
    res.send('rotadecriarPagina')
});

router.post('postPage', limiter, async, (req, res) => {
    await pageController.savePage(req,res);
});

export default router;