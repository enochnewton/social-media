"use client";

import { desktopSx, pageHeadingsx } from "@utils/styles";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { personDetailsSx } from "@utils/styles";
import Link from "next/link";

const FriendComponent = ({ user }) => {
  return (
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
    </Box>
  );
};

const Friends = () => {
  const friends = useSelector(state => state.friends);
  const isDesktop = useMediaQuery("(min-width:900px)");
  const { _id: userId } = useSelector(state => state.user);

  if (friends?.length === 0) {
    if (isDesktop) {
      return "";
    } else {
      return (
        <Stack sx={desktopSx}>
          <Typography variant='h2' sx={pageHeadingsx}>
            Friends
          </Typography>
          <Typography variant='h3' sx={{ textAlign: "center" }}>
            You have no friends
          </Typography>
        </Stack>
      );
    }
  }

  return (
    <Stack sx={desktopSx}>
      <Typography variant='h2' sx={pageHeadingsx}>
        Friends
      </Typography>

      {friends?.map(user => (
        <Link
          style={{ textTransform: "none", textDecoration: "none" }}
          href={`/chat/${user?._id}?userId=${userId}`}
          key={user._id}
        >
          <FriendComponent user={user} />
        </Link>
      ))}
    </Stack>
  );
};

export default Friends;
