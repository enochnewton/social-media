"use client";

import React, { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import { desktopSx } from "@utils/styles";
import ChatComponent from "@components/Chat";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import { isOnline } from "@state";
import { io } from "socket.io-client";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const user = useSelector(state => state.user);
  const socket = useRef();
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

  // connect and add user to socket server and get all users
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", users => {
      setOnlineUsers(users);
    });
  }, [user._id]);

  const checkOnlineStatus = chat => {
    const chatMember = chat.usersIds.find(member => member !== user._id);
    const online = onlineUsers.find(user => user.userId === chatMember);
    dispatch(isOnline(online ? true : false));
    return online ? true : false;
  };

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
              online={checkOnlineStatus(chat)}
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
