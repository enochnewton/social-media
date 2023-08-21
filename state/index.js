import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: {},
  posts: [],
  friends: [],
  friendRequests: [],
  currentChat: {},
  online: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode(state, action) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUser(state, action) {
      state.user = action.payload;
      state.friends = state.user.friends;
    },
    setPosts(state, action) {
      if (Array.isArray(action.payload)) {
        // If payload is an array, it's the case when you fetch all posts from the database
        state.posts = action.payload;
      } else {
        // If payload is not an array, it's a single post, so add it to the posts array
        state.posts.unshift(action.payload);
      }
    },
    setPost(state, action) {
      const updatedPosts = state.posts.map(post => {
        if (post._id === action.payload._id) return action.payload;
        return post;
      });
      state.posts = updatedPosts;
    },
    deletePost(state, action) {
      const updatedPosts = state.posts.filter(
        post => post._id !== action.payload
      );
      state.posts = updatedPosts;
    },
    setFriendReq(state, action) {
      if (Array.isArray(action.payload)) {
        // If payload is an array, it's the case when you fetch all friendReq from the database
        state.friendRequests = action.payload;
      } else {
        // If payload is not an array, it's a single post, so add it to the friendreq array
        state.friendRequests.unshift(action.payload);
      }
    },
    setFriends(state, action) {
      if (Array.isArray(action.payload)) {
        state.friends = action.payload;
      } else {
        state.friends.unshift(action.payload);
      }
    },
    setOtherUser(state, action) {
      state.otherUser = action.payload;
    },
    setCurrentChat(state, action) {
      state.currentChat = action.payload;
    },
    isOnline(state, action) {
      state.online = action.payload;
    },
  },
});

export const {
  setMode,
  setUser,
  setPost,
  setPosts,
  deletePost,
  setFriendReq,
  setFriends,
  setOtherUser,
  setCurrentChat,
  isOnline,
} = authSlice.actions;
export default authSlice.reducer;
