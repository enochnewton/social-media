import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

// find a chat
const findChat = (userId, receiverId) =>
  axios(`/api/chat/find/${userId}/${receiverId}`);

export const useFindChat = (userId, receiverId) => {
  return useQuery(
    ["chat", userId, receiverId],
    () => findChat(userId, receiverId),
    {
      onError: (error) => console.log(error),
    }
  );
};

// fetch chats of a user
const fetchChats = (userId) => axios(`/api/chat/${userId}`);

export const useFetchChats = (userId) => {
  return useQuery(["chats", userId], () => fetchChats(userId), {
    select: (data) => data.data,
    enabled: !!userId,
  });
};

// send a message
const sendMessage = (message) => axios.post("/api/messages", message);

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation(sendMessage, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("messages");
      queryClient.setQueryData("messages", (old) => {
        if (!old) return [data.data];
        return [...old, data.data];
      });
    },
  });
};
