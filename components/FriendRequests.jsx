"use client";

import { desktopSx, pageHeadingsx } from "@utils/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { setFriendReq } from "@state";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import CustomBtn from "./Button";
import { personDetailsSx } from "@utils/styles";

const AcceptFriendReq = ({ req: { senderId, _id: reqId }, accRejRequest }) => {
  return (
    <>
      <Box component='article' sx={personDetailsSx}>
        {/* profile */}
        <Stack direction='row' alignItems='center' gap={2}>
          <Avatar
            src={senderId?.picturePath}
            alt={senderId?.fullName}
            sx={{ width: "50px", height: "50px" }}
          />
          <Stack direction='column' alignItems='flex-start' gap={1}>
            <Typography variant='h5' fontWeight={400} color='text.primary'>
              {senderId?.fullName}
            </Typography>
          </Stack>
        </Stack>

        {/* friend requests */}
        <Stack direction='row' alignItems='center' gap={1}>
          <CustomBtn
            py='6px'
            border='2px solid'
            borderColor='primary.main'
            px='12px'
            name='Add'
            onClick={() => accRejRequest(reqId, "accepted", senderId._id)}
          />
          <CustomBtn
            py='6px'
            px='12px'
            name='Remove'
            variant='outlined'
            color='button'
            border='2px solid'
            borderColor='button.main'
            textColor='button.main'
            onClick={() => accRejRequest(reqId, "rejected", senderId._id)}
          />
        </Stack>
      </Box>
      <Divider sx={{ color: "button.main" }} />
    </>
  );
};

const FriendRequests = () => {
  const friendReq = useSelector(state => state.friendRequests);
  const isDesktop = useMediaQuery("(min-width:900px)");
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    const getFriendReq = async () => {
      try {
        const { data } = await axios(`/api/getFriendReq/${user._id}`);
        dispatch(setFriendReq(data));
      } catch (error) {
        console.log(error);
      }
    };
    if (user?._id) {
      getFriendReq();
    }
  }, [user]);

  // accept or reject friend request
  const accRejRequest = async (friendReqId, status, senderId) => {
    try {
      const response = await axios.patch(`/api/getFriendReq/${friendReqId}`, {
        status,
      });

      // create a chat between the two users if the request is accepted
      if (status === "accepted") {
        const { data } = await axios.post("/api/chat", {
          senderId,
          receiverId: user._id,
        });
      }

      // remove the request from the state
      const newFriendReq = friendReq.filter(
        req => req._id.toString() !== friendReqId
      );

      dispatch(setFriendReq(newFriendReq));
    } catch (error) {
      console.log(error);
    }
  };

  if (friendReq?.length === 0) {
    if (isDesktop) {
      return "";
    } else {
      return (
        <Stack sx={desktopSx}>
          <Typography variant='h2' sx={pageHeadingsx}>
            Friends Requests
          </Typography>
          <Typography variant='h3' sx={{ textAlign: "center" }}>
            You have no friend requests
          </Typography>
        </Stack>
      );
    }
  }
  return (
    <Stack sx={desktopSx}>
      <Typography variant='h2' sx={pageHeadingsx}>
        Friend Requests
      </Typography>
      {friendReq?.map(req => (
        <AcceptFriendReq
          accRejRequest={accRejRequest}
          key={req._id}
          req={req}
        />
      ))}
    </Stack>
  );
};

export default FriendRequests;
