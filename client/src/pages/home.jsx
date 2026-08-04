import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './css/home.css'

function Home() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [elements, setElements] = useState([]);
    useEffect(() => {
  const verifyPage = async () => {
    try {
      const response = await fetch('http://localhost:3000/createPage/searchPages', {
        method: 'GET',
      });
      if (!response.ok) {
        alert('Erro ao buscar os dados do post');
        console.log('Erro em enviar/receber as informações', response.statusText);
        return;
      }
      const data = await response.json();
      console.log(data);
      setElements(data.results)
      console.log(data.results)

    } catch (error) {
      console.log(error)
      alert('Erro', error);
    }
  };
  verifyPage();
}, []);
    return (
        <section className="mainHero">
          <section className="heroContent">
            <h1 id="grettings">Welcome, to my blog, see my latest posts!</h1>
          <div className="Posts">
          {elements.map((el) => {
              return (
                <div className="post" key={el.id} onClick={(e) => {e.preventDefault(); navigate(`/post/${el.id}`);}}>
                    <h1>{el.title}</h1>
                    <h2>{el.subTitle}</h2>
                </div>
              );
          })}
          <p>that is all for now :0</p>
       </div>
          </section>
        </section>
);
}

export default Home;