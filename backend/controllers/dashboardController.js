
import User from '../models/User.js';
import jsonwebtoken from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const JWT_SECRET = process.env.JWT_SECRET;

async function getUserInfo(req, res) {
    const token = req.cookies['token'];

        if(!token) {
           return res.status(401).json({mes: 'Não autorizado'});
        };
    try {

        const userVerify = jsonwebtoken.verify(token, JWT_SECRET);
        const id = userVerify.id
        const user = await User.findById(id).select('username email');
        if(!user) {
            return res.status(404).json({mes:'nao achamo o cara tropa'});
        };
        return res.status(200).json({ username: user.username, email: user.email });
    } catch(error) {
        console.log(error);
        return res.status(401).json({ mes: 'Token inválido' });
    }
}

export default { getUserInfo };