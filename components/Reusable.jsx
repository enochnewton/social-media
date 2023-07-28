import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FriendsIcon from "@mui/icons-material/People";
import MessageIcon from "@mui/icons-material/Message";
import ExploreIcon from "@mui/icons-material/ExploreOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PersonDetails from "@components/PersonDetails";
import { desktopSx, editProfileSx, pageHeadingsx } from "@utils/styles";
import CreatePost from "./CreatePost";
import { messages, posts } from "@utils/data";
import Post from "./Post";
import React from "react";

const navItems = [
  { name: "Friend Request", icon: <PersonAddIcon />, link: "/friend-request" },
  { name: "Friends", icon: <FriendsIcon />, link: "/friend" },
  { name: "Messages", icon: <MessageIcon />, link: "/messages" },
  { name: "Explore", icon: <ExploreIcon />, link: "/add-friend" },
];

const AddFriends = () => (
  <Stack sx={desktopSx}>
    <Typography variant='h2' sx={pageHeadingsx}>
      Add Friends
    </Typography>
    <PersonDetails data={messages} newFriends={true} />
  </Stack>
);

const FriendRequests = () => (
  <Stack sx={desktopSx}>
    <Typography variant='h2' sx={pageHeadingsx}>
      Friend Requests
    </Typography>
    <PersonDetails data={messages} friendRequests={true} />
  </Stack>
);

const Friends = () => (
  <Stack sx={desktopSx}>
    <Typography variant='h2' sx={pageHeadingsx}>
      Friends
    </Typography>
    <PersonDetails data={messages} friends={true} />
  </Stack>
);

const HomePage = () => (
  <>
    <CreatePost />
    <Post posts={posts} />
  </>
);

const EditProfile = React.memo(({ icon, title, onClick }) => (
  <Stack
    onClick={onClick}
    sx={{
      flex: "1",
      display: "inline-flex",
      alignItems: "center",
      gap: "14px",
      cursor: "pointer",
    }}
  >
    <Stack component='article' sx={editProfileSx}>
      {icon}
    </Stack>
    <Typography
      variant='body1'
      sx={{ fontSize: { xs: "7px", sm: "11px" } }}
      color='text.secondary'
    >
      {title}
    </Typography>
  </Stack>
));

export { navItems, AddFriends, FriendRequests, Friends, HomePage, EditProfile };
