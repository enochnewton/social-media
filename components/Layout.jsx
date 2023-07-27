"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import DesktopSideDrawer from "./DesktopSideDrawer";
import { AddFriends, FriendRequests, Friends } from "./Reusable";
import { rightSx, tabletSidebarsx } from "@utils/styles";
import { useMediaQuery } from "@mui/material";
import TabletSideDrawer from "./TabletSideDrawer";

const ResponsiveLayout = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width:900px)");
  const isTablet = useMediaQuery("(min-width:600px) and (max-width:900px)");
  const isMobile = useMediaQuery("(max-width:599px)");

  if (isDesktop)
    return (
      <Stack direction='row' sx={{ width: "100%" }} gap={4}>
        {/* left */}
        <Stack sx={{ width: "23.1%", alignItems: "center" }}>
          <Stack sx={{ position: "fixed", height: "100vh" }}>
            <DesktopSideDrawer />
          </Stack>
        </Stack>
        {/* center */}
        <Stack sx={{ width: "46.2%", mt: "24px" }}>{children}</Stack>
        {/* right */}
        <Stack sx={rightSx}>
          <Stack sx={{ gap: "32px" }}>
            <Friends />
            <AddFriends />
            <FriendRequests />
          </Stack>
        </Stack>
      </Stack>
    );

  if (isTablet)
    return (
      <Stack direction='row' gap={0}>
        <Stack sx={{ flex: "1" }}>
          <Stack sx={tabletSidebarsx}>
            <TabletSideDrawer />
          </Stack>
        </Stack>

        <Stack sx={{ flex: "2" }}>{children}</Stack>
      </Stack>
    );
  if (isMobile) return <>{children}</>;
};

export default ResponsiveLayout;
