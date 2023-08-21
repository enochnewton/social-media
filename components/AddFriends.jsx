"use client";

import { desktopSx, pageHeadingsx } from "@utils/styles";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import CustomBtn from "./Button";
import { personDetailsSx } from "@utils/styles";
import { useMediaQuery } from "@mui/material";

const SendFriendReq = ({ user, sendFriendReq }) => {
  return (
    <>
      <Box component='article' sx={personDetailsSx}>
        {/* profile */}
        <Stack direction='row' alignItems='center' gap={2}>
          <Avatar
            src={user?.picturePath}
            alt={user?.fullName}
            sx={{ width: "50px", height: "50px" }}
          />
          <Stack direction='column' alignItems='flex-start' gap={1}>
            <Typography variant='h5' fontWeight={400} color='text.primary'>
              {user?.fullName}
            </Typography>
          </Stack>
        </Stack>

        <CustomBtn
          onClick={() => sendFriendReq(user._id)}
          name='Add'
          icon={<PersonAddIcon color='icon' />}
        />
      </Box>
      <Divider key={user._id} sx={{ color: "button.main" }} />
    </>
  );
};

const AddFriends = () => {
  const [allUsers, setAllUsers] = useState([]);
  const user = useSelector(state => state.user);
  const isDesktop = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await axios(`/api/friendreq/${user._id}`);
        setAllUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user._id) {
      getAllUsers();
    }
  }, [user]);

  const sendFriendReq = async receiverId => {
    try {
      const response = await axios.post("/api/friendreq", {
        receiverId,
        senderId: user._id,
      });
      //remove the user when the request is sent
      const removeUser = allUsers.filter(user => user._id !== receiverId);
      setAllUsers(removeUser);
    } catch (error) {
      console.log(error);
    }
  };

  if (!allUsers) {
    return <h1>Loading...</h1>;
  }

  if (allUsers.length === 0) {
    if (isDesktop) {
      return "";
    } else {
      return (
        <Stack sx={desktopSx}>
          <Typography variant='h2' sx={pageHeadingsx}>
            Add Friends
          </Typography>
          <Typography variant='h3' sx={{ textAlign: "center" }}>
            No more users to add
          </Typography>
        </Stack>
      );
    }
  }

  return (
    <Stack sx={desktopSx}>
      <Typography variant='h2' sx={pageHeadingsx}>
        Add Friends
      </Typography>
      {allUsers?.map(user => (
        <SendFriendReq
          sendFriendReq={sendFriendReq}
          key={user._id}
          user={user}
        />
      ))}
    </Stack>
  );
};

export default AddFriends;
