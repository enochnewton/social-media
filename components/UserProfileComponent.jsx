"use client";

import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CustomBtn from "./Button";
import Link from "next/link";
import { useSelector } from "react-redux";

const UserProfileComponent = () => {
  const user = useSelector(state => state.user);
  return (
    <Stack
      alignItems='center'
      bgcolor='bg.main'
      sx={{
        py: "24px",
        my: "24px",
        borderRadius: "8px",
        border: "1px solid ",
        borderColor: "secondary.border",
        gap: "32px",
      }}
    >
      {/* avatar stack */}
      <Stack alignItems='center' gap='8px'>
        <Avatar
          alt={user?.fullName}
          sx={{ width: "50px", height: "50px" }}
          src={user?.picturePath}
        />
        <Stack>
          <Typography variant='body1' color='text.primary' fontWeight='600'>
            {user?.fullName}
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            @{user?.email.split("@")[0]}
          </Typography>
        </Stack>
      </Stack>

      {/* buttons stack */}
      <Link
        style={{ textTransform: "none", textDecoration: "none" }}
        href='/profile'
      >
        <CustomBtn name='My Profile' py='8px' px='32px' />
      </Link>
    </Stack>
  );
};

export default UserProfileComponent;
