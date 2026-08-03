import { useState } from "react";
import React from "react";
import TextareaAutosize from 'react-textarea-autosize';
import {useDropzone} from 'react-dropzone';
import './css/addpage.css';

function Post() {
    const formData = new FormData();
    
    const [elements, addElement] = useState([
        {id:1, type: 'TextareaAutosize', name: 'textBlock', class: 'textBlock'}
    ]);
    const deleteImage = () => {
        addElement((prevElements) => {
            const btn = elements.length-2
            const image = elements.length-3
            const newTextBlock = elements.length-1

            if(newTextBlock.value === '') {
                return prevElements.filter(
                (_, index) => index !== btn && index !== image && index !== newTextBlock)
            } else {
                 return prevElements.filter(
                (_, index) => index !== btn && index !== image
            )
            }
        });
    }

    async function savePost(file) {
        try {
            const response = await fetch('http://localhost:3000/createPage/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify(formData)
            });
            if(!response.ok) {
                alert('Erro em salvar a imagem do usuario!, delete a imagem e tente novamente!')
            }
        } catch(error) {
            console.log("erro em salvar a imagem no servidor", error)
        }
    };

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
            class: 'textBlock'
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
            <form>
                <textarea name="title" id="title" placeholder="Insert the title of your Post!"></textarea>
                <textarea name="subTitle" id="subTitle" placeholder="Insert the subtitle of your Post!"></textarea>
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
                                <button key={el.id} className={el.class} onClick={deleteImage}>
                                    Delete Image
                                </button>
                            )
                        }
                        return (
                            <TextareaAutosize
                                key={el.id}
                                name={el.name}
                                className={el.class}
                            />
      );
                    })};
                </div>                
                <button id="submit" type="submit">Post!</button>
            </form>
            </div>
        </section>
    );
}

export default Post