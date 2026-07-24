import bcrypt from 'bcrypt';

async function getForminformation(req, res) {
    try {
        const { username, email, password } = req.body;
    console.log(`React sent - User: ${username}, Email: ${email}`);
    const hashedPassword = await transformRash(password);
    console.log(hashedPassword);
     res.status(200).json({ message: 'Signup successful' });
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