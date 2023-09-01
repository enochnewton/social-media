"use client";

import Stack from "@mui/material/Stack";
import { desktopSx } from "@utils/styles";
import ChatComponent from "@components/Chat";
import { useSelector } from "react-redux";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import { useFetchChats } from "@hooks/useChat";
import Typography from "@mui/material/Typography";

const Chat = () => {
  const user = useSelector((state) => state.user);

  // fetch chats from db
  const { data: chats, status } = useFetchChats(user._id);

  if (status === "success" && chats.length === 0) {
    return (
      <Stack sx={{ mt: "-93px", bgcolor: "bg.main" }}>
        <Stack sx={{ mt: "100px" }} direction='column' alignItems='center'>
          <Stack direction='column' alignItems='center' gap={2}>
            <Typography variant='h1' color='text.primary'>
              No chats yet
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack sx={desktopSx}>
      {chats?.map((chat) => {
        const otherUserId = chat?.usersIds?.find((id) => id !== user._id);
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
