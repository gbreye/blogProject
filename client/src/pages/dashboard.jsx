import { useState } from "react";
import { useEffect } from "react";

async function Dashboard() {
    const [receivedData, setUserData] = useState("")
    try {
        const response = await fetch('http://localhost:3000/users/dashboard', {
            method:"POST",
            credentials: "include",
        });
        if(!response) {
            alert("Erro em devolver as informações do usuario");
            console.log(response.json);
        };
        while(!response.json()) {
            console.log("Tentando receber a receber a resposta do servidor")
        }
        const userData = await response.json();
        setUserData(userData);
    } catch(error) {
        console.log("Erro em requisitar as informações do usuario!", error)
    }
}