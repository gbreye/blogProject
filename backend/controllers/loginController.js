import bcrypt from 'bcrypt';
import User from '../models/User.js';

async function getValidation(req, res) {
    try {
        const {email, password} = req.body;
        const user = await findUser(email)

        if (!user) {
            console.log(user);
            return res.status(401).json({ message: "Senha ou Usuario Invalidos!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Senha ou Usuario Invalidos' });
            }
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