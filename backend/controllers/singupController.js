import bcrypt from 'bcrypt';

import User from '../models/User.js';



async function getForminformation(req, res) {
    try {
        const { username, email, password } = req.body;
    const hashedPassword = await transformRash(password);
    await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function transformRash(password) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export default { getForminformation };