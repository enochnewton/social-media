"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const [sendMessage, setSendMessage] = useState(null);
  const [recievedMsg, setRecievedMsg] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id: receiverId } = useParams();
  const userId = searchParams.get("userId");
  const socket = useRef();
  const user = useSelector(state => state.user);
  const online = useSelector(state => state.online);

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
      console.log({ otherUserId, currentChat, userId });
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
                {online ? (
                  <Typography variant='subtitle1' color='green'>
                    online
                  </Typography>
                ) : (
                  "offline"
                )}{" "}
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
          setSendMessage={setSendMessage}
          sendMessage={sendMessage}
        />
      )}
    </>
  );
};

export default IndividualChat;
