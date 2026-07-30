import { useState } from "react";
import { useEffect } from "react";
import './css/dashboard.css'

function Dashboard() {
    const [receivedData, setUserData] = useState("");

    useEffect(() => {
        async function receiveUserData() {
            try {
                const response = await fetch('http://localhost:3000/users/dashboard', {
                method:"GET",
                credentials: "include",
            });
            if(!response.ok) {
                alert("Erro em devolver as informações do usuario");
                console.log(response.json);
                return;
            };
            const userData = await response.json();
            setUserData(userData);
            } catch(error) {
                console.log("Erro em requisitar as informações do usuario!", error)
            };
        }

        receiveUserData();
    }, []);

    return (
        <div>
            <h1>{receivedData.username}</h1>
            <p>{receivedData.email}</p>
        </div>
    );
   

};

export default Dashboard;