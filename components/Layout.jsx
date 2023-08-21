"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import DesktopSideDrawer from "./DesktopSideDrawer";
import { rightSx, tabletSidebarsx } from "@utils/styles";
import { useMediaQuery } from "@mui/material";
import TabletSideDrawer from "./TabletSideDrawer";
import Navbar from "./Navbar";
import Container from "@mui/material/Container";
import { homeContainerSx } from "@utils/styles";
import { usePathname } from "next/navigation";
import AddFriends from "./AddFriends";
import Friends from "./Friends";
import FriendRequests from "./FriendRequests";

const ResponsiveLayout = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width:900px)");
  const isTablet = useMediaQuery("(min-width:600px) and (max-width:900px)");
  const isMobile = useMediaQuery("(max-width:599px)");
  const router = usePathname();
  const showNavbar = !router.includes("/chat/");
  const desktopLayout = !router.includes("/chat");

  return (
    <>
      {showNavbar && <Navbar />}
      <Container
        component='section'
        style={{
          padding: showNavbar || "0px",
        }}
        sx={homeContainerSx}
      >
        {isDesktop && (
          <Stack direction='row' sx={{ width: "100%" }} gap={4}>
            {/* left */}
            {desktopLayout ? (
              <>
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
              </>
            ) : (
              children
            )}
          </Stack>
        )}
        {isTablet && (
          <Stack direction='row' gap={0}>
            <Stack sx={{ flex: "2", overflow: "auto" }}>
              <Stack sx={tabletSidebarsx}>
                <TabletSideDrawer />
              </Stack>
            </Stack>

            <Stack sx={{ flex: "5" }}>{children}</Stack>
          </Stack>
        )}
        {isMobile && children}
      </Container>
    </>
  );
};

export default ResponsiveLayout;
