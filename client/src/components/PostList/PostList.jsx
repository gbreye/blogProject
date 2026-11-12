import Title from '../Title/Title';
import PostCard from '../PostCard/PostCard';
import './PostList.css';

function PostList({ heading, posts = [], footer }) {
  return (
    <section className="posts-page">
      <div className="posts-page__content">
        {heading && (
          <Title as="h2" className="posts-page__heading">
            {heading}
          </Title>
        )}
        <div className="posts-page__list">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {footer && <p className="posts-page__footer">{footer}</p>}
        </div>
      </div>
    </section>
  );
}

export default PostList;
