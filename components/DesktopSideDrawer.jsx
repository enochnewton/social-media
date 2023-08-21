import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CopyrightOutlined from "@mui/icons-material/Copyright";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { navItems } from "./Reusable";
import Link from "next/link";
import UserProfileComponent from "./UserProfileComponent";
import { desktopDrawerSx, footerSx } from "@utils/styles";

const DesktopSideDrawer = () => {
  return (
    <Box sx={desktopDrawerSx}>
      {/* profile component */}
      <UserProfileComponent />

      <List sx={{ mb: { md: "64px" } }}>
        <Link
          style={{ textTransform: "none", textDecoration: "none" }}
          href={navItems[2].link}
        >
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "start" }}>
              <ListItemIcon
                sx={{ textAlign: "center", color: "secondary.main" }}
              >
                {navItems[2].icon}
              </ListItemIcon>
              <ListItemText
                primary={navItems[2].name}
                sx={{ color: "text.secondary" }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
        </Link>
      </List>

      {/* footer */}
      <Stack sx={footerSx}>
        <CopyrightOutlined />
        <Typography variant='body1' color='text.primary'>
          2023 Sociopedia. All rights reserved.
        </Typography>
      </Stack>
    </Box>
  );
};

export default DesktopSideDrawer;
