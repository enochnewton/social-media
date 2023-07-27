import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddFriend from "@mui/icons-material/PersonAddAlt1";
import Image from "next/image";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const Post = React.memo(({ posts }) => (
  <>
    {posts.map(post => (
      <Stack
        key={post.id}
        sx={{
          p: "12px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          width: "100%",
          border: "1px solid",
          borderColor: "secondary.border",
          borderRadius: "16px",
          bgcolor: "bg.main",
          mb: "24px",
        }}
      >
        {/* top */}
        <Stack
          direction='row'
          sx={{
            height: "56px",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch",
          }}
        >
          <Stack direction='row' gap='8px' alignItems='center'>
            <Avatar
              sx={{ width: "30px", height: "30px" }}
              src={post.avatar}
              alt={post.firstName}
            />
            <Stack direction='column' alignItems='flex-start' gap='2px'>
              <Typography variant='h6' color='text.primary'>
                {post.firstName} {post.lastName}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {post.time}
              </Typography>
            </Stack>
          </Stack>

          <IconButton aria-label='add'>
            <AddFriend sx={{ color: "secondary.main" }} />
          </IconButton>
        </Stack>
        {/* image */}
        <Image
          src={post.image}
          alt={post.firstName}
          width={270}
          height={270}
          style={{
            borderRadius: "8px",
            width: "100%",
            height: "270px",
            objectFit: "fill",
          }}
        />
        {/* icons */}
        <Stack
          direction='row'
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch",
            height: "40px",
          }}
        >
          <Stack
            direction='row'
            sx={{
              height: "40px",
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
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
          <Typography variant='body1' fontWeight={900} color='text.secondary'>
            View comments
          </Typography>
        </Stack>
      </Stack>
    ))}
  </>
));

export default Post;
