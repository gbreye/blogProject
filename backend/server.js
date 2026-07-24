import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;
const usersRoutes = await import('./routes/users.js');

app.use('/users', usersRoutes.default);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});