"use client";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import CopyrightOutlined from "@mui/icons-material/Copyright";
import CustomBtn from "./Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LightMode from "@mui/icons-material/WbSunnyOutlined";
import { navItems } from "./Reusable";
import { useDispatch, useSelector } from "react-redux";
import { setLinkName, setMode } from "@state";
import DarkMode from "@mui/icons-material/DarkModeOutlined";
import React from "react";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";

const TabletSideDrawer = () => {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.mode);

  const handleMode = () => {
    dispatch(setMode());
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        width: { xs: "80%", sm: "calc(40vw - 100px)", md: "auto" },
        mx: "auto",
      }}
    >
      {/* profile component */}
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
            alt='jane doe'
            sx={{ width: "50px", height: "50px" }}
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
        {/* buttons stack */}
        <Link
          style={{ textTransform: "none", textDecoration: "none" }}
          href='/profile'
        >
          <CustomBtn name='My Profile' py='8px' px='32px' />
        </Link>
      </Stack>

      <List sx={{ mb: { md: "64px" } }}>
        {navItems.map(item => (
          <Link
            style={{ textTransform: "none", textDecoration: "none" }}
            href={item.link}
            key={item.name}
          >
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "start" }}>
                <ListItemIcon
                  sx={{ textAlign: "center", color: "secondary.main" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ color: "text.secondary" }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
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
        <CustomBtn
          icon={<LogoutOutlined color='text.primary' />}
          fullWidth
          variant='outlined'
          name='Log out'
          py='8px'
          px='32px'
          color='button'
          border='2px solid'
          borderColor='button.main'
          textColor='button.main'
        />
      </Stack>

      {/* footer */}
      <Stack
        alignItems='center'
        direction='row'
        bottom='20px'
        spacing={3}
        sx={{ width: "80%", mx: "auto", justifyContent: "center" }}
      >
        <CopyrightOutlined />
        <Typography variant='body1' color='text.primary'>
          2023 Sociopedia. All rights reserved.
        </Typography>
      </Stack>
    </Box>
  );
};

export default TabletSideDrawer;
