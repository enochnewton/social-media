"use client";

import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { desktopSx } from "@utils/styles";
import ChatComponent from "@components/Chat";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import Divider from "@mui/material/Divider";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  // fetch chats from db
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios(`/api/chat/${user._id}`);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user._id) fetchChats();
  }, [user._id]);

  return (
    <Stack sx={desktopSx}>
      {chats.map(chat => {
        const otherUserId = chat?.usersIds?.find(id => id !== user._id);
        return (
          <Link
            style={{ textTransform: "none", textDecoration: "none" }}
            href={`/chat/${otherUserId}?userId=${user._id}`}
            key={chat._id}
          >
            <ChatComponent
              chat={chat}
              otherUserId={otherUserId}
              currentUserId={user._id}
            />
            <Divider sx={{ color: "button.main" }} />
          </Link>
        );
      })}
    </Stack>
  );
};

export default Chat;
