import { useState } from 'react';
import PostList from '../components/PostList/PostList';
import Title from '../components/Title/Title';
import usePosts from '../hooks/usePosts';
import { Popup } from '../components/Popup/Popup';

function Home() {
  const posts = usePosts();
  const postListTitle = "Posts mais recentes.";
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section className='page-shell'>
      <Title>
        <h3 className='title'>Bem vindo, Usuario</h3>
      </Title>
      
      <Title className='subtitle'>
        Fique avontade! Observe nossos novos posts!
      </Title>

      <button 
        className='button' 
        onClick={() => setIsPopupOpen(true)}
      >
        Abrir popup
      </button>
      <Popup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)}
        title = "Popup de Teste"
        content= "Este é um popup de teste!"
      />

      <PostList title={postListTitle} posts={posts} />
    </section>
  );
}

export default Home;
