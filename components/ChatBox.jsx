"use client";

import { getTimeAgoMsg } from "@utils/data";
import React, { useEffect, useRef } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputEmoji from "react-input-emoji";
import { useState } from "react";
import CustomBtn from "./Button";
import { Box } from "@mui/material";
import { chatSenderSx, chatStacksx } from "@utils/styles";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { pusherClient } from "@utils/pusher";
import { find } from "lodash";

const ChatBox = ({
  recievedMsg,
  user,
  currentChat,
  sendMessage,
  setSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  const handleChange = newMessage => {
    setNewMessage(newMessage);
  };

  // fetch messages from db
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios(`/api/messages/${currentChat._id}`);
        setMessages(prev => [...prev, ...data]);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentChat?._id) fetchMessages();
  }, [currentChat]);

  // add the received message to the messages array
  useEffect(() => {
    if (recievedMsg !== null && recievedMsg.chatId === currentChat._id) {
      setMessages(prevMessages => [...prevMessages, recievedMsg]);
    }
  }, [recievedMsg]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMsg = async e => {
    e.preventDefault();

    // trim the message
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage) return;

    const message = {
      senderId: user._id,
      text: trimmedMessage,
      chatId: currentChat._id,
    };

    // send message to socket
    const receiverId = currentChat.usersIds.find(id => id !== user._id);
    setSendMessage({ ...message, receiverId });

    try {
      const { data } = await axios.post("/api/messages", message);
      setMessages(prev => [...prev, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  // subscribe to pusher channel
  useEffect(() => {
    pusherClient.subscribe(currentChat?._id);

    const messageHandler = message => {
      setMessages(prev => {
        // if (prev._id === message._id) return prev;
        return [...prev, message];
      });
    };

    pusherClient.bind("new:message", messageHandler);

    return () => {
      pusherClient.unsubscribe(currentChat?._id);
      pusherClient.unbind("new:message", messageHandler);
    };
  }, [currentChat._id]);

  return (
    <Container sx={{ mt: "80px" }}>
      {/* chat body */}
      <Stack sx={chatStacksx}>
        {messages.map((data, index) => (
          <Stack
            ref={scroll}
            key={index}
            sx={{
              padding: "0.7rem",
              minWidth: "100px",
              borderRadius: data.senderId
                ? "1rem 1rem 0 1rem"
                : "1rem 1rem 1rem 0",
              width: "fit-content",
              display: "flex",
              flexDirection: " column",
              gap: "0.5rem",
              alignSelf: data.senderId === user._id ? "flex-end" : "flex-start",
              bgcolor:
                data.senderId === user._id ? "chat.sender" : "chat.receiver",
            }}
          >
            <Typography
              variant='h5'
              sx={{
                color:
                  data.senderId === user._id
                    ? "chat.senderText"
                    : "chat.receiverText",
              }}
            >
              {data.text}
            </Typography>
            <Typography
              variant='caption'
              sx={{
                alignSelf: "flex-end",
                color:
                  data.senderId === user._id ? "chat.timeSender" : "chat.time",
              }}
            >
              {getTimeAgoMsg(data.createdAt)}{" "}
              {data.senderId === user._id ? "✔️" : ""}
            </Typography>
          </Stack>
        ))}
      </Stack>
      {/* chat sender */}

      <Stack sx={chatSenderSx}>
        <Box sx={{ width: "80%" }}>
          <InputEmoji value={newMessage} onChange={handleChange} />
        </Box>
        <CustomBtn
          onClick={handleSendMsg}
          icon={<SendIcon color='icon' />}
          name='Send'
        />
      </Stack>
    </Container>
  );
};

export default ChatBox;
