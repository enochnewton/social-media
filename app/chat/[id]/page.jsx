"use client";

import React, { useEffect, useState } from "react";
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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const IndividualChat = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [recievedMsg, setRecievedMsg] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id: receiverId } = useParams();
  const userId = searchParams.get("userId");
  const user = useSelector(state => state.user);

  // find chat with other user
  useEffect(() => {
    const findChat = async () => {
      try {
        const { data } = await axios(`/api/chat/find/${userId}/${receiverId}`);
        setCurrentChat(data);
      } catch (error) {
        console.log(error);
      }
    };

    findChat();
  }, []);

  useEffect(() => {
    const findOtherUser = async () => {
      const otherUserId = currentChat?.usersIds.find(
        userId => userId !== user._id
      );
      try {
        const { data } = await axios(`/api/user/find/${otherUserId}`);
        setOtherUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentChat !== null) findOtherUser();
  }, [currentChat]);

  return (
    <>
      <Stack sx={{ mt: "-93px", bgcolor: "chat.main" }}>
        <Box sx={chatHeaderSx}>
          {/* profile */}
          <IconButton
            sx={{ flex: "1" }}
            aria-label=''
            onClick={() => router.push("/chat")}
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
            </Stack>
          </Stack>
          <MoreVertIcon fontSize='large' />
        </Box>
      </Stack>
      {/* chat containers */}
      {currentChat !== null && (
        <ChatBox
          currentChat={currentChat}
          user={user}
          recievedMsg={recievedMsg}
        />
      )}
    </>
  );
};

export default IndividualChat;
