import { useState } from "react";
import { useEffect } from "react";

function Home() {
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [elements, setElements] = useState([]);
    useEffect(() => {
    const verifyPage = async () => {
      
      try {
        const response = await fetch('http://localhost:3000/createPage/verifyPage', {
          method: 'GET',
        });

        if (!response.ok) {
          alert('Erro ao buscar os dados do post');
          console.log('Erro em enviar/receber as informações', response.statusText);
          return;
        }

        const data = await response.json();
        setPostData(data);
        setTitle(data.title);
        setSubTitle(data.subTitle);
       
    } catch(error) {
        alert('Erro')
    }

    verifyPage();
    
  }, []);
    return (
        <div>
            <h2>Hello World</h2>
        </div>
    )
}

export default Home;