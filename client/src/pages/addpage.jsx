import { useState } from "react";
import React from "react";
import TextareaAutosize from 'react-textarea-autosize';
import {useDropzone} from 'react-dropzone';
import './css/addpage.css';

function Post() {
    const [elements, addElement] = useState([
        {id:1, type: 'TextareaAutosize', name: 'textBlock', class: 'textBlock'}
    ]);
    //isso aq é importante pra fazer o baguil funciona//
    const addImage = (file) => {
        const newImage = {
            id: Date.now(),
            type: 'image',
            name: 'imageBlock',
            class: 'imageBlock',
            src: URL.createObjectURL(file)
        }
        
        const newTextArea = {
            id: Date.now() + 1,
            type: 'TextareaAutosize', 
            name: 'textBlock', 
            class: 'textBlock'
        }
        addElement((prevElements) => [...prevElements, newImage, newTextArea]);
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
                        return (
                            <TextareaAutosize
                                key={el.id}
                                name={el.name}
                                className={el.class}
                            />
      );
                    })};
                </div>                
                <button type="submit">Post!</button>
            </form>
            </div>
        </section>
    );
}

export default Post