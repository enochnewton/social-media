"use client";
import { useSelector } from "react-redux";
import Post from "./Post";
import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const PostWidget = ({ myPosts = false }) => {
  const user = useSelector(state => state.user);
  const posts = useSelector(state => state.posts);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (!posts || posts.length === 0) {
      setShowSkeleton(true);

      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 5000); // 5000 milliseconds = 5 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [posts]);

  if (showSkeleton) {
    return (
      <Skeleton
        variant='rectangular'
        sx={{ borderRadius: "16px" }}
        height='447px'
        animation='wave'
      />
    );
  } else if (posts.length === 0) {
    return (
      <Typography
        variant='h5'
        sx={{
          color: "text.secondary",
          textAlign: "center",
          mt: "50px",
          fontWeight: "bold",
        }}
      >
        No Posts
      </Typography>
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
