import User from '../models/User.js';
import Page from '../models/Page.js'



async function savePage(req, res) {
    const { title, subTitle, structure } = req.body;
    const parsedStructure = JSON.parse(structure);

    if (title === "" || subTitle === "") {
        return res.status(400).json({mes: "conteudo recebido é null"})
    };

    for (const file of req.files) {
        const imageFieldName = file.fieldname.replace('image_', '');
        const { data, error } = await supabase.storage.from('postImage').upload(`public/${file.originalname}`, file.buffer, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.mimetype,
        });

        if (error) {
            console.error('Erro ao fazer upload da imagem:', error);
            return res.status(500).json({ mes: "Erro ao fazer upload da imagem" });
        }

        const {data: urlData
        } = supabase.storage.from('postImage').getPublicUrl(`public/${file.originalname}`);
        const imageElement = parsedStructure.find(el => el.id === imageFieldName && el.type === 'image');
        if (imageElement) {
            imageElement.src = imageUrl;
        }
    }
    try {
        const createPage = await Page.create({ title, subTitle, structure: JSON.stringify(parsedStructure) });
        if(!createPage) {
            return res.status(500).json({mes: "eu sinto shadow no meu"})
        };
        return res.status(201).json({ mes: "page created", data: createPage })
    } catch(error) {
        console.log(error)
    }
};

export default { savePage }