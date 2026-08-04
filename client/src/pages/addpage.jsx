import { useState } from "react";                                               
import React from "react";                                                      
import TextareaAutosize from 'react-textarea-autosize';                         
import {useDropzone} from 'react-dropzone';                                     
import './css/addpage.css';                                                     
                                                                                
function Post() {                                                               
    const [sendData, setDataToSend] = useState({title: '', subtitle: ''})       
    const [elements, addElement] = useState([                                   
        {id:1, type: 'TextareaAutosize', name: 'textBlock', class: 'textBlock', content: ''},
    ]);                                                                         
    const handleTitleChange = (e) => {                                          
        e.preventDefault();                                                     
        const { name, value } = e.target;                                       
        setDataToSend(prevState => ({                                           
            ...prevState,                                                       
            [name]: value                                                       
        }));                                                                    
    }                                                                           
                                                                                
    const handleTextChange = (e, id) => {                                       
        e.preventDefault();                                                     
        const { value } = e.target;                                             
        addElement(prevElements => prevElements.map(el => {                     
            if (el.id === id) {                                                 
                return { ...el, content: value };                               
            }                                                                   
            return el;                                                          
        }));                                                                    
    }                                                                           
    const handleSubmit = async (e) => {                                         
            e.preventDefault();                                                 
            await savePost();                                                   
     }                                                                          
    //estados//                                                                 
    //BUGS ta quebrando o site inteiro//                                        
    //const deleteImage = () => {                                               
        //criar isso dps                                                        
    //}                                                                         
    //BUGS ta quebrando o site inteiro//                                        
async function savePost(file) {                                                 
  const formData = new FormData();                                              
                                                                                
  const structure = elements.filter(el => el.type !== 'button').map(el => {     
    if(el.type === 'image') {                                                   
      return { id: el.id, type: 'image', src: null };                           
    }                                                                           
    return { id: el.id, type: 'text', content: el.content ?? '' };              
  });                                                                           
                                                                                
  formData.append('structure', JSON.stringify(structure));                      
  formData.append('title', sendData.title);                                     
  formData.append('subTitle', sendData.subTitle);                               
                                                                                
  elements.forEach((el) => {                                                    
    if (el.type === 'image' && el.file) {                                       
      formData.append(`image_${el.id}`, el.file);                               
    }                                                                           
  });                                                                           
                                                                                
  try {                                                                         
    const response = await fetch('http://localhost:3000/createPage/addpage', {  
      method: 'POST',                                                           
      credentials: 'include',                                                   
      body: formData                                                            
    });                                                                         
                                                                                
    if(!response.ok) {                                                          
      alert('Erro em salvar a imagem do usuario!, delete a imagem e tente novamente!');
    }                                                                           
  } catch(error) {                                                              
    console.log("erro em salvar a imagem no servidor", error);                  
  }                                                                             
}                                                                               
    //isso aq é importante pra fazer o baguil funciona//                        
    const addImage = (file) => {                                                
        const newImage = {                                                      
            id: Date.now(),                                                     
            type: 'image',                                                      
            name: 'ImageBlock' + elements.length + 1,                           
            class: 'imageBlock',                                                
            file: file,                                                         
            src: URL.createObjectURL(file)                                      
        }                                                                       
                                                                                
        const deleteBtns = {                                                    
            id: Date.now() + 1,                                                 
            type: 'button',                                                     
            name: 'deleteItem',                                                 
            class: 'deleteItem'                                                 
        }                                                                       
        const newTextArea = {                                                   
            id: Date.now() + 2,                                                 
            type: 'TextareaAutosize',                                           
            name: 'ImageBlock' + elements.length + 1,                           
            class: 'textBlock',                                                 
            content: ''                                                         
        }                                                                       
                                                                                
        addElement((prevElements) => [...prevElements, newImage, deleteBtns, newTextArea]);
                                                                                
    };                                                                          
                                                                                
    const dragEvents ={                                                         
        onDragEnter: (e) => {                                                   
            e.preventDefault();                                                 
            console.log('onDragEnter');                                         
        },                                                                      
        onDragLeave: (e) => {                                                   
            e.preventDefault();                                                 
            console.log('onDragLeave');                                         
        },                                                                      
        onDragOver: (e) => {                                                    
            e.preventDefault();                                                 
            console.log('onDragOver');                                          
        },                                                                      
        onDrop: (e) => {                                                        
            e.preventDefault();                                                 
                const file = e.dataTransfer.files[0];                           
                if (file && file.type.startsWith('image/')) {                   
                    addImage(file);                                             
                }                                                               
            }                                                                   
                                                                                
                                                                                
    };                                                                          
     return(                                                                    
        <section className="mainContent">                                       
            <div className="dropImage" {...dragEvents}>                         
            <form onSubmit={handleSubmit}>                                      
                <textarea name="title" id="title" placeholder="Insert the title of your Post!" onChange={handleTitleChange}></textarea>
                <textarea name="subTitle" id="subTitle" placeholder="Insert the subtitle of your Post!"onChange={handleTitleChange}></textarea>
                <div className="blogContent">                                   
                    {elements.map((el) => {                                     
                        if(el.type === 'image') {                               
                            return (                                            
                                <img key={el.id}                                
                                src={el.src}                                    
                                alt={el.name}                                   
                                className={el.class}>                           
                                </img>                                          
                            )                                                   
                        }                                                       
                        if(el.type === 'button') {                              
                            return(                                             
                                <button key={el.id} className={el.class}>       
                                    Delete Image                                
                                </button>                                       
                            )                                                   
                        }                                                       
                        return (                                                
                            <TextareaAutosize                                   
                                key={el.id}                                     
                                name={el.name}                                  
                                className={el.class}                            
                                onChange={(e) => handleTextChange(e, el.id)}    
                            />                                                  
                        )                                                       
                    })}                                                         
                </div>                                                          
                <button id="submit" type="submit" >Post!</button>               
            </form>                                                             
            </div>                                                              
        </section>                                                              
    );                                                                          
                                                                                
};                                                                              
                                                                                
export default Post                                                             