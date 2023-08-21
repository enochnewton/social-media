"use client";
import { useSelector } from "react-redux";
import Post from "./Post";

const PostWidget = ({ myPosts = false }) => {
  const user = useSelector(state => state.user);
  const posts = useSelector(state => state.posts);

  if (!posts || posts.length === 0) {
    return <div>Loading posts...</div>; // You can replace this with a loading indicator or any other appropriate content
  }

  return (
    <>
      {posts?.map(post => (
        <Post
          key={post._id}
          myPosts={myPosts}
          post={post}
          loggedInUser={user._id}
        />
      ))}
    </>
  );
};

export default PostWidget;
