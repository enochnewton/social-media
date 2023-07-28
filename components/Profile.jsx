"use client";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import { EditProfile } from "@components/Reusable";
import EditIcon from "@mui/icons-material/Edit";
import Form from "@components/Form";
import React, { useState } from "react";
import Post from "@components/Post";
import { posts } from "@utils/data";

const Profile = React.memo(({ userProfile }) => {
  const [profileType, setProfileType] = useState("posts");
  console.log(userProfile);

  return (
    <div>
      {/* profile */}
      <Stack
        sx={{
          height: { xs: "150px", sm: "200px" },
          backgroundImage: "url(/profile-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            top: { xs: "120px", sm: "150px" },
            right: "0",
            left: "0",
          }}
        >
          <div style={{ flex: "2" }} />
          <Stack
            alignItems='center'
            sx={{ flex: "2", alignItems: "center", justifyContent: "center" }}
            gap='8px'
          >
            <Avatar
              alt='jane doe'
              sx={{
                width: { xs: "50px", sm: "90px" },
                height: { xs: "50px", sm: "90px" },
              }}
              src='/profile-1.jpg'
            />
            <Stack>
              <Typography variant='body1' color='text.primary' fontWeight='600'>
                Jane Doe
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                @janedoe
              </Typography>
            </Stack>
          </Stack>
          <EditProfile
            flex='1'
            onClick={() => setProfileType("posts")}
            icon={
              <CollectionsOutlinedIcon
                sx={{ fontSize: { xs: "small", sm: "medium" } }}
              />
            }
            title={userProfile ? "Posts" : "My Posts"}
          />
          <EditProfile
            onClick={() => setProfileType("profile")}
            flex='1'
            icon={<EditIcon sx={{ fontSize: { xs: "small", sm: "medium" } }} />}
            title={userProfile ? "Edit Profile" : "Edit Profile"}
          />
        </Stack>
      </Stack>
      {/* about and posts */}
      <Stack sx={{ mt: { xs: "70px", sm: "100px" } }}>
        {profileType === "posts" ? (
          <Post posts={posts} myPosts={!userProfile} />
        ) : (
          <Form userProfile={userProfile} />
        )}
      </Stack>
    </div>
  );
});

export default Profile;
