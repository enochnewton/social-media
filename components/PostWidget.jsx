"use client";
import { useSelector } from "react-redux";
import Post from "./Post";
import Skeleton from "@mui/material/Skeleton";

const PostWidget = ({ myPosts = false }) => {
  const user = useSelector(state => state.user);
  const posts = useSelector(state => state.posts);

  if (!posts || posts.length === 0) {
    return (
      <Skeleton
        variant='rectangular'
        sx={{ borderRadius: "16px" }}
        height='447px'
        animation='wave'
      />
    );
  }

  return (
    <>
      {posts?.map(post => (
        <Post
          key={post._id}
          myPosts={myPosts}
          post={post}
          user={user}
          loggedInUser={user._id}
        />
      ))}
    </>
  );
};

export default PostWidget;
