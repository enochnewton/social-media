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
import { useFindChat } from "@hooks/useChat";
import { useFetchOtherUser } from "@hooks/useUser";

const IndividualChat = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [otherUserId, setOtherUserId] = useState(null);
  const [recievedMsg, setRecievedMsg] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id: receiverId } = useParams();
  const userId = searchParams.get("userId");
  const user = useSelector((state) => state.user);

  const { data, status } = useFindChat(userId, receiverId);

  useEffect(() => {
    if (status === "success") {
      setCurrentChat(data.data);
    }
  }, [status]);

  useEffect(() => {
    if (currentChat !== null) {
      const otherUserId = currentChat.usersIds.find(
        (userId) => userId !== user._id
      );
      setOtherUserId(otherUserId);
    }
  }, [currentChat]);

  const { data: otherUser } = useFetchOtherUser(otherUserId);

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
