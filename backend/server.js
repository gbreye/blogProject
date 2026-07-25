import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, disconnectDB } from './config/database.js';
dotenv.config();
const app = express();
const PORT = 3000;
const usersRoutes = await import('./routes/users.js');
app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes.default);

app.get("/", (req, res) => {
    res.send("Hello World");
});

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});