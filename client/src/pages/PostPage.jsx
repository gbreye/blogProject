import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageShell from '../components/PageShell/PageShell';
import PostContent from '../components/PostContent/PostContent';
import Button from '../components/Button/Button';
import './PostPage.css';

function AddedPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await fetch('http://localhost:3000/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) return;

        const data = await response.json();
        setIsAdmin(data.admin === 1);
      } catch (error) {
        console.log(error);
      }
    };

    const verifyPage = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/createPage/verifyPage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          console.log('Erro em enviar/receber as informações', response.statusText);
          return;
        }

        const data = await response.json();
        let structure = data.structure;

        if (typeof structure === 'string') {
          try {
            structure = JSON.parse(structure);
          } catch (error) {
            console.log('Erro ao parsear structure:', error);
            structure = [];
          }
        }

        setPost({ ...data, structure: Array.isArray(structure) ? structure : [] });
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

      if (!response.ok) {
        alert('erro ao deletar a pagina');
      }
    } catch {
      alert('erro em deletar a pagina');
    }
  }

  if (isLoading) {
    return (
      <PageShell>
        <p className="text-block">Carregando...</p>
      </PageShell>
    );
  }

  if (!post) {
    return (
      <PageShell>
        <p className="text-block">Post não encontrado.</p>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PostContent
        title={post.title}
        subtitle={post.subTitle}
        structure={post.structure}
      />

      {isAdmin && (
        <div className="post-actions">
          <Button className="post-actions__delete" onClick={handleDelete}>
            Delete Page
          </Button>
        </div>
      )}
    </PageShell>
  );
}

export default AddedPost;
