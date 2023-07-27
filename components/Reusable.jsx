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
  { name: "Friend Request", icon: <PersonAddIcon /> },
  { name: "Friends", icon: <FriendsIcon /> },
  { name: "Messages", icon: <MessageIcon /> },
  { name: "Explore", icon: <ExploreIcon /> },
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

const EditProfile = React.memo(({ icon, title, ...props }) => (
  <Stack
    sx={{
      ...props,
      display: "inline-flex",
      alignItems: "center",
      gap: "14px;",
    }}
  >
    <Stack component='article' sx={editProfileSx}>
      {icon}
    </Stack>
    <Typography variant='body1' color='text.secondary'>
      {title}
    </Typography>
  </Stack>
));

export { navItems, AddFriends, FriendRequests, Friends, HomePage, EditProfile };
