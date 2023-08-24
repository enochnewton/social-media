"use client";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  profileAvatarSx,
  profileStack1sx,
  profileStack2sx,
  profileStack3sx,
} from "@utils/styles";
import PostWidget from "./PostWidget";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@state";
import axios from "axios";
import Box from "@mui/material/Box";

const Profile = React.memo(({ userProfile, id }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [viewedUser, setViewedUser] = useState({});

  const findUser = async () => {
    try {
      const { data } = await axios.get(`/api/user/find/${id}`);
      setViewedUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyPosts = async () => {
    try {
      const { data } = await axios(`/api/post/${user._id}`);
      dispatch(setPosts(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPosts = async () => {
    try {
      const { data } = await axios(`/api/post/${id}`);
      dispatch(setPosts(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userProfile) {
      getUserPosts();
      findUser();
    } else {
      getMyPosts();
    }
  }, []);

  return (
    <div>
      {/* profile */}
      <Stack sx={profileStack1sx}>
        <Stack sx={profileStack2sx}>
          <div style={{ flex: "2" }} />
          <Stack sx={profileStack3sx}>
            {userProfile ? (
              <>
                <Avatar
                  alt={viewedUser?.name}
                  sx={profileAvatarSx}
                  src={viewedUser?.picturePath}
                />
                <Stack>
                  <Typography
                    variant='body1'
                    color='text.primary'
                    fontWeight='600'
                  >
                    {viewedUser?.fullName}
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    @{viewedUser?.email?.split("@")[0]}
                  </Typography>
                </Stack>
              </>
            ) : (
              <>
                <Avatar
                  alt={session?.user.name}
                  sx={profileAvatarSx}
                  src={session?.user.image}
                />
                <Stack>
                  <Typography
                    variant='body1'
                    color='text.primary'
                    fontWeight='600'
                  >
                    {session?.user?.name
                      ?.split(" ")
                      ?.map(
                        name =>
                          name.charAt(0).toUpperCase() +
                          name.slice(1).toLowerCase()
                      )
                      ?.join(" ")}
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    @{session?.user?.email?.split("@")[0]}
                  </Typography>
                </Stack>
              </>
            )}
          </Stack>
          <Box flex='1' />
          <Box flex='1' />
        </Stack>
      </Stack>
      {/* about and posts */}
      <Stack sx={{ mt: { xs: "70px", sm: "100px" } }}>
        <PostWidget myPosts={!userProfile} />
      </Stack>
    </div>
  );
});

export default Profile;
