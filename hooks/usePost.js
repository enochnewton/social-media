import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

// fetch all posts
const fetchPosts = () => axios("/api/post");

export const useGetAllPosts = () => {
  return useQuery("all-posts", fetchPosts, {
    select: (data) => data.data,
  });
};

// fetch posts by user id
const fetchPostsByUserId = (id) => axios(`/api/post/${id}`);

export const useGetPostsByUserId = (id) => {
  return useQuery(["posts-by-user-id", id], () => fetchPostsByUserId(id), {
    select: (data) => data.data,
  });
};

// create post
const createPost = (formData) => axios.post("/api/post", formData);

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation(createPost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("all-posts");
      queryClient.setQueryData("all-posts", (old) => ({
        ...old,
        data: [...old.data, data.data],
      }));
    },
  });
};

// like post

const handleLikePost = ({ postId, userId }) => {
  return axios.patch(`/api/post`, {
    postId,
    userId,
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation(handleLikePost, {
    onMutate: async (likedPost) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("all-posts");

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData("all-posts");

      queryClient.setQueryData("all-posts", (old) => ({
        ...old,
        data: old.data.map((post) =>
          post._id === likedPost.postId
            ? {
                ...post,
                likes:
                  likedPost.userId in post.likes
                    ? { ...post.likes, [likedPost.userId]: false }
                    : { ...post.likes, [likedPost.userId]: true },
              }
            : post
        ),
      }));

      // Return a context object with the snapshotted value
      return { previousPosts };
    },
    onError: (_error, _newPost, context) => {
      queryClient.setQueryData("all-posts", context.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries("all-posts");
    },
  });
};

// post comment
const postComment = ({ postId, comment, loggedInUser }) =>
  axios.post(`/api/post/${loggedInUser}`, {
    postId,
    text: comment,
  });

export const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("all-posts");
    },
  });
};

// handle like comment
const handleLikeComment = ({ postId, commentId, loggedInUser }) =>
  axios.patch(`/api/post/${loggedInUser}`, {
    postId,
    commentId,
  });

export const useLikeComment = () => {
  const queryClient = useQueryClient();

  return useMutation(handleLikeComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("all-posts");
    },
  });
};

// delete post
const deletePost = ({ postId, picturePath }) =>
  axios.delete(`/api/post`, {
    data: {
      postId,
      picturePath,
    },
  });

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("all-posts");
    },
  });
};
