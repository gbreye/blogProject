import { useState } from "react";
const [isPopupOpen, setIsPopupOpen] = useState(false)

export function onClose() {
    setIsPopupOpen(false);
}

export function onOpen() {
    setIsPopupOpen(true);
}