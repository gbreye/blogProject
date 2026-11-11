import PostList from '../components/PostList/PostList';
import usePosts from '../hooks/usePosts';

function AllPosts() {
  const posts = usePosts();

  return (
    <PostList
      heading="All Posts"
      posts={posts}
      footer="that is all for now :0"
    />
  );
}

export default AllPosts;
