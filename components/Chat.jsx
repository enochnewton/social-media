"use client";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { chatBoxSx } from "@utils/styles";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { useFetchOtherUser } from "@hooks/useUser";

const ChatComponent = React.memo(({ chat, otherUserId }) => {
  const { data: otherUser } = useFetchOtherUser(otherUserId);

  if (otherUser === null)
    return (
      <Skeleton
        variant='rectangular'
        animation='pulse'
        sx={{ height: "60px", width: "100%" }}
      />
    );

  return (
    <Box component='article' sx={chatBoxSx}>
      {/* profile */}
      <Stack direction='row' alignItems='center' gap={2}>
        <Avatar
          src={otherUser?.picturePath}
          alt={otherUser?.fullName}
          sx={{ width: "50px", height: "50px" }}
        />

        <Stack direction='column' alignItems='flex-start' gap={1}>
          <Typography variant='h5' fontWeight={400} color='text.primary'>
            {otherUser?.fullName}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
});

export default ChatComponent;
