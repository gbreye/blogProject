import { useEffect, useState } from 'react';

const POSTS_URL = 'http://localhost:3000/createPage/searchPages';

function usePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        const response = await fetch(POSTS_URL);
        if (!response.ok) {
          console.log('Erro em enviar/receber as informações', response.statusText);
          return;
        }

        const data = await response.json();
        if (isMounted) setPosts(data.results ?? []);
      } catch (error) {
        console.log(error);
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return posts;
}

export default usePosts;
