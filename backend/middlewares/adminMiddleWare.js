import jsonwebtoken from "jsonwebtoken";
import User from "../config/crudUser.js";


const JWT_SECRET = process.env.JWT_SECRET;

async function adminMiddleWare(req, res, next) {
    const token = req.cookies['token'];

        if(!token) {
           return res.status(401).json({mes: 'Não autorizado'});
        };

    try {
        const userVerify = jsonwebtoken.verify(token, JWT_SECRET);
        const id = userVerify.id
        const user = await User.find(id);
        const admin = user.admin;
        if(!user) {
            return res.status(404).json({mes:'usuario nao encontrado'});
        }
        if(admin === 0.0) {
            return res.status(401).json({mes: 'usuario não é admin!'});
        };
        
        next();
    } catch(error) {
        console.log(error);
    };
}

export default {adminMiddleWare}