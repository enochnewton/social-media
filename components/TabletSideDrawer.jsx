"use client";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import CustomBtn from "./Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LightMode from "@mui/icons-material/WbSunnyOutlined";
import { navItems } from "./Reusable";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "@state";
import DarkMode from "@mui/icons-material/DarkModeOutlined";
import React from "react";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import { signOut } from "next-auth/react";

const TabletSideDrawer = () => {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.mode);
  const user = useSelector(state => state.user);

  const handleMode = () => {
    dispatch(setMode());
  };

  return (
    <Box sx={{ textAlign: "center", mx: "28px" }}>
      {/* profile component */}

      <Tooltip title='My Profile' placement='right' arrow>
        <Link
          style={{ textTransform: "none", textDecoration: "none" }}
          href='/profile'
        >
          <Stack alignItems='center' my='16px'>
            <Avatar
              alt={user?.fullName}
              sx={{ width: "80px", height: "80px" }}
              src={user?.picturePath}
            />
          </Stack>
        </Link>
      </Tooltip>

      <List
        component={Stack}
        sx={{ mb: "48px", alignItems: "center", alignSelf: "center", gap: 2 }}
      >
        {navItems.map(item => (
          <Link
            style={{ textTransform: "none", textDecoration: "none" }}
            href={item.link}
            key={item.name}
          >
            <Tooltip title={item.name} placement='right' arrow>
              <ListItemButton
                sx={{
                  textAlign: "center",
                  color: "secondary.main",
                }}
              >
                {item.icon}
              </ListItemButton>
            </Tooltip>
          </Link>
        ))}
      </List>

      <Stack alignItems='center' my='32px' gap='24px'>
        {/* mode */}
        <IconButton
          sx={{
            height: "max-content",
            width: "max-content",
          }}
          onClick={event => {
            handleMode();
            event.stopPropagation();
          }}
          color='inherit'
          aria-label='mode'
        >
          {mode === "dark" ? (
            <LightMode fontSize='large' />
          ) : (
            <DarkMode fontSize='large' />
          )}
        </IconButton>

        {/* logout */}
        <div
          onClick={() => signOut({ callbackUrl: `${window.location.origin}/` })}
        >
          <CustomBtn
            icon={<LogoutOutlined color='text.primary' />}
            fullWidth
            variant='outlined'
            name='Logout'
            py='8px'
            px='32px'
            color='button'
            border='2px solid'
            borderColor='button.main'
            textColor='button.main'
          />
        </div>
      </Stack>
    </Box>
  );
};

export default TabletSideDrawer;
