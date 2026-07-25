import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jsonwebtoken from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = '1h'; 


async function getValidation(req, res) {
    try {
        const {email, password} = req.body;
        if (!email) {
            return res.status(400).json({message: 'please provide a email to proceed'})
        }
        if (!password) {
            return res.status(400).json({message: 'please provide a password to proceed'})
        }
        const user = await findUser(email)

        if (!user) {
            console.log(user);
            return res.status(401).json({ message: "Senha ou Usuario Invalidos!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Senha ou Usuario Invalidos' });
            }

        const token = jsonwebtoken.sign(
            { id: user._id, email: user.email },
                JWT_SECRET,
            { expiresIn: TOKEN_EXPIRY }
        );

        res.cookie('token', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            httpOnly: true,
            maxAge:3600000
        })
        return res.status(200).json({ message: "Login realizado com sucesso!" });
    } catch (error) {
        return res.status(500).json({mensage : 'controller error'})
    }
            
}


async function findUser(emailAddress) {
    const user = await User.findOne({ email: emailAddress });
  return user;
};

export default { getValidation }