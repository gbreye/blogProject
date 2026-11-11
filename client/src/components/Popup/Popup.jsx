import React from "react"
import Title from "../Title/Title"
import './Popup.css'

export function Popup({isOpen, onClose, title, content}){
    if(!isOpen) return null;

    return (
        <section className="popup-overlay">
            <section className="popup-shell">
                <Title>{title}</Title>
                <p className="text-block">{content}</p>
                <button className='button' onClick={onClose}>Fechar</button>
            </section> 
        </section>
    )
}