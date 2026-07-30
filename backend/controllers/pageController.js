import User from '../models/User.js';
import Page from '../models/Page.js'
import jsonwebtoken from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

async function savePage(req, res) {
    const { title, subTitle, textBlock } = req.body;
    if (title === "" || subTitle === "" || textBlock === "") {
        return res.status(400).json({mes: "conteudo recebido é null"})
    };
    try {
        const createPage = await Page.create({ title, subTitle, textBlock});
        if(!createPage) {
            return res.status(500).json({mes: "eu sinto shadow no meu"})
        };
        return res.status(201).json({ mes: "page created", data: createPage })
    } catch(error) {
        console.log(error)
    }
};

export default { savePage }