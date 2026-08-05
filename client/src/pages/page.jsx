import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import './css/page.css';

function AddedPost() {
    const [postData, setPostData] = useState(null);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [structure, setStructure] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

const { id } = useParams(); 

  useEffect(() => {

    const verifyAdmin = async () => {
      try {
        const response = await fetch('http://localhost:3000/me', {
          method: 'GET',
          credentials: 'include'
        });
        if (!response.ok) {
          alert('Erro ao buscar os dados do post');
          console.log('Erro em enviar/receber as informações', response.statusText);
          return;
        }
        const data = await response.json()
        if(data.isAdmin === true) {
          setIsAdmin(true);
       }
        else {
          setAddPage(false)
        }
      } catch(error) {
        console.log(error)
      }
      }
    const verifyPage = async () => {
      if (!id) {
        alert('ID da página não fornecido');
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/createPage/verifyPage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id }) 
        });

        if (!response.ok) {
          alert('Erro ao buscar os dados do post');
          console.log('Erro em enviar/receber as informações', response.statusText);
          return;
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);
        setPostData(data);
        console.log(postData);
        setTitle(data.title);
        setSubTitle(data.subTitle);
        let parsedStructure = [];
        try {
            parsedStructure = typeof data.structure === 'string'
                ? JSON.parse(data.structure)
                : data.structure;
        } catch (e) {
            console.log('Erro ao parsear structure:', e);
        }   
    setStructure(Array.isArray(parsedStructure) ? parsedStructure : []);
    console.log('Estrutura do post:', structure);
    console.log(postData);
      } catch (error) {
        console.log('Erro na requisição:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    verifyAdmin();
    verifyPage();
    
  }, [id]); 

  async function handleDelete() {
    try {
      const response = await fetch('http://localhost:3000/createPage/deletePage', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
    if(!response.ok) {
      alert('erro ao deletar a pagina')
    }
    } catch(error) {
      alert('erro em deletar a pagina');
    }
  }


    return (
        <section className="mainContent">
            <section className="postContent">
                <h1 name="title" id="title" placeholder="Insert the title of your Post!" >{title}</h1>
                <h2 name="subTitle" id="subTitle" placeholder="Insert the subtitle of your Post!">{subTitle}</h2>
                <div className="blogContent">
          {structure.map((el) => {
            if (el.type === 'image') {
              return (
                <img 
                  key={el.id}
                  src={el.src}
                  alt={el.name || "Imagem do post"}
                  className={el.class}
                />
              );
            }
            
            if (el.type === 'text') {
                 return (
                    <p key={el.id} className={el.class} style={{ color: 'white' }}>
                    {el.content}
                    </p>
                );
            }
            
           
            return null; 
          })}
        </div>
        <div className='buttons'>
          {isAdmin && (
              <button className="deleteButton" onClick={handleDelete}>
                Delete Page
              </button>
            )}
            {isAdmin && (
              <button className="modifyButton">
                Modify Page
              </button>
            )}
        </div>
        
            </section>    
        </section>
    )
}

export default AddedPost