"use client";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddFriend from "@mui/icons-material/PersonAddAlt1";
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
  postContainerSx,
  postIconsInnerSx,
  postIconsSx,
  postImageStyles,
  postTopSx,
} from "@utils/styles";
import Drawer from "@mui/material/Drawer";
import { comments } from "@utils/data";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Slide,
} from "@mui/material";
import { useEffect } from "react";

const Profile = React.memo(
  ({ data, width = "30px", height = "30px", comment }) => (
    <Stack direction='row' gap='8px' alignItems='center'>
      <Avatar sx={{ width, height }} src={data?.avatar} alt={data.firstName} />
      <Stack direction='column' alignItems='flex-start' gap='2px'>
        <Typography variant='h6' color='text.primary'>
          {data.firstName} {data.lastName}
        </Typography>
        <Typography variant='caption' color='text.secondary'>
          {comment ? data.text : data.time}
        </Typography>
      </Stack>
    </Stack>
  )
);

const Post = ({ posts, myPosts }) => {
  const [commentsOpen, setCommentsOpen] = useState({});

  const toggleComments = postId => {
    setCommentsOpen(prevCommentsState => {
      const newState = { ...prevCommentsState };
      newState[postId] = !newState[postId];
      return newState;
    });
  };

  return (
    <>
      {posts.map(post => (
        <Stack key={post.id} sx={postContainerSx}>
          {/* top */}
          <Stack sx={postTopSx}>
            <Link
              style={{ textTransform: "none", textDecoration: "none" }}
              href={`/profile/${post.id}`}
            >
              <Profile data={post} />
            </Link>
            {myPosts ? (
              <IconButton aria-label='add'>
                <Tooltip title='delete' arrow>
                  <DeleteOutlineIcon sx={{ color: "error.main" }} />
                </Tooltip>
              </IconButton>
            ) : (
              <IconButton aria-label='add'>
                <Tooltip title='Add friend' arrow>
                  <AddFriend sx={{ color: "secondary.main" }} />
                </Tooltip>
              </IconButton>
            )}
          </Stack>
          {/* image */}
          <Image
            src={post.image}
            alt={post.firstName}
            width={270}
            height={270}
            style={postImageStyles}
          />
          {/* icons */}
          <Stack sx={postIconsSx}>
            <Stack sx={postIconsInnerSx}>
              <IconButton>
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton>
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
              liked by <span style={{ fontWeight: 900 }}>Malik Berry</span> and{" "}
              <span style={{ fontWeight: 900 }}>5 others.</span>
            </Typography>
            <Typography variant='body1' color='text.primary'>
              <span style={{ fontWeight: 900 }}>{post.name}</span> Lorem ipsum,
              dolor sit amet consectetur
            </Typography>
            <Typography
              onClick={() => toggleComments(post.id)}
              variant='body1'
              fontWeight={900}
              color='text.secondary'
              sx={{ cursor: "pointer" }}
            >
              View comments
            </Typography>
            {/* comments */}
            {commentsOpen[post.id] && (
              <Slide
                direction='up'
                in={commentsOpen[post.id]}
                mountOnEnter
                unmountOnExit
                onClose={() => toggleComments(post.id)}
              >
                <Stack
                  onClick={e => {
                    e.stopPropagation();
                  }}
                  sx={{ height: "150px", overflow: "auto", width: "100%" }}
                >
                  <List
                    sx={{
                      overflow: "auto",
                      width: "100%",
                      width: "100%",
                      bgcolor: "bg.comment",
                      p: "4px 2px",
                      borderRadius: "4px",
                    }}
                  >
                    {comments.map((comment, index) => (
                      <React.Fragment key={index}>
                        <ListItem
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Profile data={comment} comment />
                          <Stack alignItems='center'>
                            <IconButton>
                              <FavoriteBorderIcon />
                            </IconButton>
                            <Typography variant='caption' color='text.primary'>
                              {comment.likes}
                            </Typography>
                          </Stack>
                        </ListItem>
                        {index !== comments.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </Stack>
              </Slide>
            )}
          </Stack>
        </Stack>
      ))}
    </>
  );
};

export default Post;
