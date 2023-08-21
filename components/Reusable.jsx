import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FriendsIcon from "@mui/icons-material/People";
import MessageIcon from "@mui/icons-material/Message";
import ExploreIcon from "@mui/icons-material/ExploreOutlined";
import React from "react";

const navItems = [
  { name: "Friend Request", icon: <PersonAddIcon />, link: "/friend-request" },
  { name: "Friends", icon: <FriendsIcon />, link: "/friend" },
  { name: "Messages", icon: <MessageIcon />, link: "/chat" },
  { name: "Explore", icon: <ExploreIcon />, link: "/add-friend" },
];

export { navItems };
