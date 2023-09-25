import axios from "axios";
import { useQuery } from "react-query";

// find a user
const findUser = (email) => axios(`/api/user/${email}`);

export const useFindUser = (email) => {
  return useQuery(["user", email], () => findUser(email), {
    select: (data) => data.data,
    enabled: !!email,
    onError: (error) => console.log(error),
  });
};

// fetch other user
const fetchOtherUser = (userId) => axios(`/api/user/find/${userId}`);

export const useFetchOtherUser = (userId) => {
  return useQuery(["user", userId], () => fetchOtherUser(userId), {
    select: (data) => data.data,
    enabled: !!userId,
    onError: (error) => console.log(error),
  });
};

// fetch messages of a chat
const fetchMessages = (chatId) => axios(`/api/messages/${chatId}`);

export const useFetchMessages = (chatId) => {
  return useQuery(["messages", chatId], () => fetchMessages(chatId), {
    select: (data) => data.data,
    enabled: !!chatId,
    onError: (error) => console.log(error),
  });
};

// get all users
const getAllUsers = (userId) => axios(`/api/friendreq/${userId}`);

export const useGetAllUsers = (userId) => {
  return useQuery(["users", userId], () => getAllUsers(userId), {
    select: (data) => data.data,
    enabled: !!userId,
    onError: (error) => console.log(error),
  });
};
