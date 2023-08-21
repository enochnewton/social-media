"use client";

import { useSession } from "next-auth/react";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CustomBtn from "./Button";
import Link from "next/link";

const UserProfileComponent = () => {
  const { data: session } = useSession();
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
          alt={session?.user.name}
          sx={{ width: "50px", height: "50px" }}
          src={session?.user.image}
        />
        <Stack>
          <Typography variant='body1' color='text.primary' fontWeight='600'>
            {session?.user.name
              .split(" ")
              .map(
                name =>
                  name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
              )
              .join(" ")}
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            @{session?.user.email.split("@")[0]}
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
