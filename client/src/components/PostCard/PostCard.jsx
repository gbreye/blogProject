import { useNavigate } from 'react-router-dom';
import Title from '../Title/Title';
import './PostCard.css';

function PostCard({ post }) {
  const navigate = useNavigate();

  const openPost = () => navigate(`/post/${post.id}`);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPost();
    }
  };

  return (
    <article
      className="post-card"
      onClick={openPost}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <Title as="h2" className="post-card__title">{post.title}</Title>
      <Title as="h3" subtitle className="post-card__subtitle">{post.subTitle}</Title>
    </article>
  );
}

export default PostCard;
