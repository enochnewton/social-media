"use client";

import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { chatHeaderSx } from "@utils/styles";
import ChatBox from "@components/ChatBox";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

const IndividualChat = () => {
  const otherUser = useSelector(state => state.otherUser);
  const router = useRouter();
  return (
    <>
      <Stack sx={{ mt: "-93px", bgcolor: "chat.main" }}>
        <Box sx={chatHeaderSx}>
          {/* profile */}
          <IconButton
            sx={{ flex: "1" }}
            aria-label=''
            onClick={() => router.back()}
          >
            <ArrowBack />
          </IconButton>
          <Stack flex='10' direction='row' alignItems='center' gap={2}>
            <Avatar
              src={otherUser?.picturePath}
              alt={otherUser?.fullName}
              sx={{ width: "50px", height: "50px" }}
            />
            <Stack direction='column' alignItems='flex-start'>
              <Typography variant='h5' fontWeight={700} color='text.primary'>
                {otherUser?.fullName}
              </Typography>
              <Typography variant='h6' color='text.secondary'>
                online
              </Typography>
            </Stack>
          </Stack>
          <MoreVertIcon fontSize='large' />
        </Box>
      </Stack>
      {/* chat container */}
      <ChatBox />
    </>
  );
};

export default IndividualChat;
