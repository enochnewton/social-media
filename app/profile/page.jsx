import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ResponsiveLayout from "@components/Layout";
import Container from "@mui/material/Container";
import { homeContainerSx } from "@utils/styles";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import { EditProfile } from "@components/Reusable";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => (
  <Stack
    alignItems='center'
    sx={{ flex: "2", alignItems: "center", justifyContent: "center" }}
    gap='8px'
  >
    <Avatar
      alt='jane doe'
      sx={{ width: "90px", height: "90px" }}
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
);

const MyProfile = () => {
  return (
    <Container component='section' sx={homeContainerSx}>
      <ResponsiveLayout>
        {/* profile */}
        <Stack
          sx={{
            height: "200px",
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
              top: "150px",
              right: "0",
              left: "0",
            }}
          >
            <div style={{ flex: "2" }} />
            <Profile />
            <EditProfile
              flex='1'
              icon={<CollectionsOutlinedIcon fontSize='medium' />}
              title='My Posts'
            />
            <EditProfile
              flex='1'
              icon={<EditIcon fontSize='medium' />}
              title='Edit Profile'
            />
          </Stack>
        </Stack>
      </ResponsiveLayout>
    </Container>
  );
};

export default MyProfile;
