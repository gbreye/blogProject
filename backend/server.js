import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB, disconnectDB } from './config/database.js';

import { createClient } from '@supabase/supabase-js'

dotenv.config();
const app = express();
const PORT = 3000;
const usersRoutes = await import('./routes/users.js');
const pageRouter = await import('./routes/pages.js');


const supabase = createClient(
  process.env.VITE_SUPABASE_URL, 
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());


app.use('/users', usersRoutes.default);
app.use('/createPage', pageRouter.default);


app.get("/", (req, res) => {
    res.send("Hello World");
});

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

