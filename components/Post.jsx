"use client";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import React, { useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import {
  commentListItemSx,
  commentListSx,
  postCommentSx,
  postContainerSx,
  postIconsInnerSx,
  postIconsSx,
  postImageStyles,
  postTopSx,
} from "@utils/styles";
import { getTimeAgo } from "@utils/data";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { useSession } from "next-auth/react";
import TextField from "@mui/material/TextField";
import CustomBtn from "@components/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deletePost, setPost } from "@state";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@utils/firebase";
import { toast } from "react-hot-toast";

const Profile = React.memo(
  ({ data, width = "30px", height = "30px", isComment }) => {
    return (
      <Stack direction='row' gap='8px' alignItems='center'>
        <Avatar
          sx={{ width, height }}
          src={data?.userPicturePath || data?.user.picturePath}
          alt={data.userName || data.user.fullName}
        />
        <Stack direction='column' alignItems='flex-start' gap='2px'>
          <Typography variant='h6' color='text.primary'>
            {data.userName || data.user.fullName}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {isComment ? data.text : getTimeAgo(data.createdAt)}
          </Typography>
        </Stack>
      </Stack>
    );
  }
);

const Post = ({ myPosts = false, post, loggedInUser, user }) => {
  const [commentsVisibility, setCommentsVisibility] = useState({});
  const [postComments, setPostComments] = useState({});
  const [comment, setComment] = useState("");
  const isLiked = Boolean(post.likes[loggedInUser]);
  const likeCount = Object.keys(post.likes).length;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);

  const { data: session } = useSession();
  const toggleComments = postId => {
    setCommentsVisibility(prevVisibility => {
      return {
        ...prevVisibility,
        [postId]: !prevVisibility[postId],
      };
    });
  };
  const togglePostComments = postId => {
    setPostComments(prevVisibility => {
      return {
        ...prevVisibility,
        [postId]: !prevVisibility[postId],
      };
    });
  };

  const likePost = async () => {
    try {
      const { data } = await axios.patch(`/api/post`, {
        postId: post._id,
        userId: loggedInUser,
      });
      dispatch(setPost(data));
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async e => {
    e.preventDefault();
    if (comment === "") return alert("Please enter a comment");
    try {
      const { data } = await axios.post(`/api/post/${loggedInUser}`, {
        postId: post._id,
        text: comment,
      });
      setComment("");
      dispatch(setPost(data));
      //  after posting comment, close the comment box
      setPostComments(prevVisibility => {
        return {
          ...prevVisibility,
          [post._id]: false,
        };
      });
      // after posting comment, open the comments box
      setCommentsVisibility(prevVisibility => {
        return {
          ...prevVisibility,
          [post._id]: true,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeComment = async commentId => {
    try {
      const { data } = await axios.patch(`/api/post/${loggedInUser}`, {
        postId: post._id,
        commentId,
      });
      dispatch(setPost(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    // delete post from firebase
    setLoading(toast.loading("deleting post..."));

    const fileRef = ref(storage, post.picturePath);

    try {
      await deleteObject(fileRef);
    } catch (error) {
      setLoading(toast.dismiss(loading));

      toast.error("Something went wrong");
      console.log("Error deleting file:", error);
    }
    setLoading(false);
    try {
      await axios.delete(`/api/post`, {
        data: {
          postId: post._id,
          picturePath: post.picturePath,
        },
      });
      setLoading(toast.dismiss(loading));
      toast("Post Deleted", {
        icon: "🔔",
        duration: 4000,
      });

      dispatch(deletePost(post._id));
    } catch (error) {
      console.log(error);
      setLoading(toast.dismiss(loading));
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <Stack sx={postContainerSx}>
      {/* top */}
      <Stack sx={postTopSx}>
        <Link
          style={{ textTransform: "none", textDecoration: "none" }}
          href={`${
            session?.user.email === user?.email
              ? "/profile"
              : `/profile/${post?.userId}`
          }`}
        >
          <Profile data={post} />
        </Link>
        {myPosts && (
          <IconButton
            disabled={loading || typeof loading === "string"}
            onClick={handleDeletePost}
            aria-label='add'
          >
            <Tooltip title='delete' arrow>
              <DeleteOutlineIcon sx={{ color: "error.main" }} />
            </Tooltip>
          </IconButton>
        )}
      </Stack>
      {/* image */}

      <Image
        src={post.picturePath}
        alt={post.userName}
        width={270}
        height={270}
        style={postImageStyles}
      />
      {/* icons */}
      <Stack sx={postIconsSx}>
        <Stack sx={postIconsInnerSx}>
          <IconButton onClick={likePost}>
            {isLiked ? (
              <FavoriteIcon sx={{ color: "error.main" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton onClick={() => togglePostComments(post._id)}>
            <CommentIcon />
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Stack>
        <IconButton>
          <BookmarkBorderIcon />
        </IconButton>
      </Stack>
      {/* bottom */}
      <Stack
        sx={{ alignSelf: "stretch", alignItems: "flex-start", gap: "4px" }}
      >
        <Typography variant='body1' color='text.primary'>
          liked by <span style={{ fontWeight: 900 }}>Malik Berry</span>
          <span style={{ fontWeight: 900 }}>
            {likeCount === 0 ? "" : ` and ${likeCount} others`}
          </span>
        </Typography>
        <Typography variant='body1' color='text.primary'>
          <span style={{ fontWeight: 900 }}>{post.userName}</span> {post.text}
        </Typography>
        {post?.comments.length > 0 && (
          <Typography
            onClick={() => toggleComments(post._id)}
            variant='body1'
            fontWeight={900}
            color='text.secondary'
            sx={{ cursor: "pointer" }}
          >
            View comments
          </Typography>
        )}
        {/* comments */}
        {commentsVisibility[post._id] && (
          <Box width='100%' onClose={() => toggleComments(post.id)}>
            <Stack
              onClick={e => {
                e.stopPropagation();
              }}
              sx={{ maxHeight: "150px", overflow: "auto", width: "100%" }}
            >
              <List sx={commentListSx}>
                {post?.comments &&
                  post.comments.map((comment, index) => {
                    const isCommentLiked = comment.likes[loggedInUser] || false;
                    const commentLikeCount = Object.values(
                      comment.likes
                    ).filter(liked => liked).length;

                    return (
                      <React.Fragment key={comment._id}>
                        <ListItem sx={commentListItemSx}>
                          <Profile data={comment} isComment />
                          <Stack alignItems='center'>
                            <IconButton
                              onClick={() => handleLikeComment(comment._id)}
                            >
                              {isCommentLiked ? (
                                <FavoriteIcon sx={{ color: "error.main" }} />
                              ) : (
                                <FavoriteBorderIcon />
                              )}
                            </IconButton>
                            <Typography variant='caption' color='text.primary'>
                              {commentLikeCount === 0
                                ? ""
                                : `${commentLikeCount} likes`}
                            </Typography>
                          </Stack>
                        </ListItem>
                        {index !== post.comments.length - 1 && <Divider />}
                      </React.Fragment>
                    );
                  })}
              </List>
            </Stack>
          </Box>
        )}
        {/* post comment */}
        {postComments[post._id] && (
          <Stack
            autoComplete='off'
            component='form'
            onSubmit={postComment}
            sx={postCommentSx}
          >
            <Stack
              sx={{ alignItems: "center", flexDirection: "row", flex: "3" }}
            >
              <Avatar
                sx={{ width: "28px", height: "28px" }}
                src={user?.picturePath}
                alt={user.name}
              />
              <TextField
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder={`What's on your mind, ${
                  user?.fullName?.split(" ")[0]
                }?`}
                fullWidth
                sx={{
                  "& fieldset": { border: "none" },
                  p: "0",
                }}
              />
            </Stack>

            <Stack direction='row' spacing={1} alignItems='center'>
              <CustomBtn
                name='Comment'
                width='74px'
                height='32px'
                px='34px'
                py='15px'
                borderRadius='16px'
                type='submit'
              />
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Post;
