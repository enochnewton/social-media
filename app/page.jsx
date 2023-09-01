"use client";
import CreatePost from "@components/CreatePost";
import PostWidget from "@components/PostWidget";
import { useGetAllPosts } from "@hooks/usePost";
import { setPosts } from "@state";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const { data } = useGetAllPosts();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setPosts(data));
    }
  }, [data]);

  return (
    <div>
      <CreatePost />
      <PostWidget />
    </div>
  );
};

export default HomePage;
