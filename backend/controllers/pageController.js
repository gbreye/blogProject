import User from '../models/User.js';
import Page from '../models/Page.js';
import { createClient } from '@supabase/supabase-js';
import { Cursor } from 'mongoose';

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

async function searchPages(req, res, db) {
  try {
    const cursor = db.collection('pages').find().limit(5);
    const pages = []
    const results = []
  
  if(!cursor) {
    return res.status(404).json({mes: "banco de dados indisponivel ou aba pages não encontrada"})
  }
  for await (const pages of cursor) {
    results.push({
      id: page._id,
      title: page.title,
      subTitle: page.subTitle
    });
  }
  if(results.length === 0){
    return res.status(404).json({mes:'Erro em tentar requisitr info do usuario nenhuma pagina salva'})
  }
  return res.status(200).json({results})
 }catch(error) {
  console.log('erro', error)
  return res.status(500).json({mes: 'Internal Server Error.'})
 }

}
export default { savePage, getPage }