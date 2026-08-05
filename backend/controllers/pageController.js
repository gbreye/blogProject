import User from '../models/User.js';
import Page from '../models/Page.js';
import mongoose from 'mongoose';
import { createClient } from '@supabase/supabase-js';



const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_PUBLISHABLE_KEY);

async function savePage(req, res) {
  const { title, subTitle, structure } = req.body;
  const parsedStructure = JSON.parse(structure);
  
  if (title === "" || subTitle === "") {
    return res.status(400).json({ mes: "conteudo recebido é null" });
  }

  for (const file of req.files) {
    const id = file.fieldname.replace('image_', '');
    const fileName = `${Date.now()}_${file.originalname}`;
    
    const { data, error } = await supabase.storage
      .from('postImage')
      .upload(`public/${fileName}`, file.buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.mimetype,
      });

    if (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      return res.status(500).json({ mes: "Erro ao fazer upload da imagem" });
    }

    const { data: publicUrlData } = supabase.storage
      .from('postImage')
      .getPublicUrl(`public/${fileName}`);

    const target = parsedStructure.find(el => String(el.id) === id);
    if (target) {
      target.src = publicUrlData.publicUrl;
    }
  }

  try {
    const createPage = await Page.create({ 
      title, 
      subTitle, 
      structure: JSON.stringify(parsedStructure) 
    });
    
    if (!createPage) {
      return res.status(500).json({ mes: "eu sinto shadow no meu" });
    }
    
    return res.status(201).json({ mes: "page created", data: createPage });
  } catch (error) {
    console.log(error);
    return res.status(550).json({ mes: "Erro interno" });
  }
}

async function getPage(req, res) {
    const {id} = req.body;
    try {
        const page = await Page.findById(id);
        if (!page) {
            return res.status(404).json({ mes: "Página não encontrada" });
        }
        return res.status(200).json(page);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mes: "Erro interno" });
    }
}

async function searchPagesHome(req, res, mongoose) {
  try {
    const cursor = mongoose.connection.db.collection('pages').find().limit(5);
    const results = [];
    
    for await (const page of cursor) {
      results.push({
        id: page._id,
        title: page.title,
        subTitle: page.subTitle
      });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ mes: 'Nenhuma pagina salva encontrada.' });
    }
    
    return res.status(200).json({ results });
  } catch (error) {
    console.log('erro', error);
    return res.status(500).json({ mes: 'Internal Server Error.' });
  }
}

async function searchPagesAll(req, res, mongoose) {
  try {
    const cursor = mongoose.connection.db.collection('pages').find();
    const results = [];
    
    for await (const page of cursor) {
      results.push({
        id: page._id,
        title: page.title,
        subTitle: page.subTitle
      });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ mes: 'Nenhuma pagina salva encontrada.' });
    }
    
    return res.status(200).json({ results });
  } catch (error) {
    console.log('erro', error);
    return res.status(500).json({ mes: 'Internal Server Error.' });
  }
}

async function deletePage(req, res) {
  const {id} = req.body

  if(!id) {
    return res.status(400).json({mes: 'erro no recebimento do id'});
  }
  try {
    const deletedPage = await Page.findByIdAndDelete(id);
    if(!deletedPage) {
      return res.status(404).json({mes: 'pagina nao encontrada'})
    }
    return res.status(200).json({ message: 'Página deletada com sucesso' });
  } catch(error) {
    console.log('erro tropa', error)
  }
  
}

export default { savePage, getPage, searchPagesHome, searchPagesAll, deletePage };