import CreatePost from "@components/CreatePost";
import Post from "@components/Post";
import { posts } from "@utils/data";

const HomePage = () => (
  <div>
    <CreatePost />
    <Post posts={posts} />
  </div>
);

export default HomePage;
