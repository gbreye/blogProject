import Title from "../Title/Title"
import Button from "../Button/Button"
import './Popup.css'

export function Popup({ isOpen, onClose, title, content }) {
    if (!isOpen) return null;

    return (
        <section className="popup-overlay">
            <div className="popup-shell">
                <Title>{title}</Title>
                <p className="text-block">{content}</p>
                <Button onClick={onClose}>Fechar</Button>
            </div>
        </section>
    )
}
