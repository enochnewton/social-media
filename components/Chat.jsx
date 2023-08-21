"use client";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { chatBoxSx } from "@utils/styles";
import axios from "axios";
import Badge from "@mui/material/Badge";

const ChatComponent = React.memo(({ chat, otherUserId, online }) => {
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    // find the other user in the db
    const fetchOtherUser = async () => {
      try {
        const { data } = await axios(`/api/user/find/${otherUserId}`);
        setOtherUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOtherUser();
  }, [chat]);

  return (
    <Box component='article' sx={chatBoxSx}>
      {/* profile */}
      <Stack direction='row' alignItems='center' gap={2}>
        {online ? (
          <Badge
            overlap='circular'
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            variant='dot'
            sx={{ ".MuiBadge-dot": { bgcolor: "success.main" } }}
          >
            <Avatar
              src={otherUser?.picturePath}
              alt={otherUser?.fullName}
              sx={{ width: "50px", height: "50px" }}
            />
          </Badge>
        ) : (
          <Avatar
            src={otherUser?.picturePath}
            alt={otherUser?.fullName}
            sx={{ width: "50px", height: "50px" }}
          />
        )}

        <Stack direction='column' alignItems='flex-start' gap={1}>
          <Typography variant='h5' fontWeight={400} color='text.primary'>
            {otherUser?.fullName}
          </Typography>
          {online ? (
            <Typography variant='subtitle1' color='green'>
              online
            </Typography>
          ) : (
            <Typography variant='h6' color='text.secondary'>
              offline
            </Typography>
          )}
        </Stack>
      </Stack>

      <Typography variant='h6' color='text.primary'>
        {chat.time}
      </Typography>
    </Box>
  );
});

export default ChatComponent;
