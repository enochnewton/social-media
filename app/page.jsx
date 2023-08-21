"use client";
import CreatePost from "@components/CreatePost";
import PostWidget from "@components/PostWidget";
import { setPosts } from "@state";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await axios("/api/post");
        dispatch(setPosts(response?.data));
      } catch (error) {
        console.log(error);
      }
    };
    getAllPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <CreatePost />
      <PostWidget />
    </div>
  );
};

export default HomePage;
