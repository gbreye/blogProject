import PostList from '../components/PostList/PostList';
import Title from '../components/Title/Title';
import usePosts from '../hooks/usePosts';

function Home() {
  const posts = usePosts();

  return (
    <section className='page-shell'>
      <Title as='h3'>Bem vindo, Usuario</Title>

      <Title as='h2' subtitle>
        Fique avontade! Observe nossos novos posts!
      </Title>

      <PostList heading='Posts mais recentes.' posts={posts} />
    </section>
  );
}

export default Home;
