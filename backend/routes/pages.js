import express from 'express';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import mongoose from 'mongoose';

const router = express.Router();

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } 
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 20 ,
    message: 'Muitas requisições criadas, tente novamente mais tarde.'
});

import pageController from '../controllers/pageController.js';
import adminMiddleware from '../middlewares/adminMiddleWare.js'

router.post('/addpage', upload.any(), adminMiddleware.adminMiddleWare, async (req, res) => {
    console.log("entrou no addpage");
    await pageController.savePage(req, res);
});

router.post('/verifyPage', async (req, res) => {
    console.log("entrou no verifyPage");
    await pageController.getPage(req, res);
});

router.get('/searchPages', async (req, res) => {
    console.log("entrou no searchPages");
    await pageController.searchPagesHome(req, res, mongoose);
});

router.get('/searchPagesAll', async(req, res) => {
    await pageController.searchPagesAll(req, res, mongoose);
});

router.delete('/deletePage', adminMiddleware.adminMiddleWare, async (req, res) => {
    console.log("entrou no deletePage");
    await pageController.deletePage(req, res);
});

export default router;