const desktopSx = {
  bgcolor: { xs: "inherit", md: "bg.main" },
  px: "16px",
  pt: "8px",
  borderRadius: "8px",
  overflow: "auto",
  mt: { xs: "-30px", sm: "0" },
  flexDirection: "column",
  scrollbarWidth: "none" /* Firefox */,
  "&::-webkit-scrollbar": {
    display: "none" /* Chrome */,
  },
};

const rightSx = {
  width: "30.8%",
  mt: "24px",
  float: "right",
  maxHeight: "100vh",
  overflowY: "auto",
  position: "sticky",
  top: 0,
  scrollbarWidth: "none" /* Firefox */,
  "&::-webkit-scrollbar": {
    display: "none" /* Chrome */,
  },
};

const tabletSidebarsx = {
  position: "fixed",
  overflow: "scroll",
  height: "100vh",
  scrollbarWidth: "none" /* Firefox */,
  "&::-webkit-scrollbar": {
    display: "none" /* Chrome */,
  },
};

const pageHeadingsx = {
  fontWeight: 400,
  textAlign: "center",
  color: "primary.main",
  my: 2,
};

const homeContainerSx = {
  mt: "93px",
  scrollbarWidth: "none" /* Firefox */,
  "&::-webkit-scrollbar": {
    display: "none" /* Chrome */,
  },
};

const appbarSx = {
  px: { xs: "16px", sm: "56px" },
  bgcolor: "bg.main",
  py: { xs: "8px", sm: "8px" },
  backdropFilter: "blur(10px)",
  transition: "position 0.3s ease",
};

const appStack1Sx = {
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
};

const editProfileSx = {
  width: "50px",
  height: "50px",
  padding: "15px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  borderRadius: "40px",
  background: "rgba(255, 255, 255, 0.33)",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  backdropFilter: "blur(3px)",
};

export {
  desktopSx,
  rightSx,
  tabletSidebarsx,
  pageHeadingsx,
  homeContainerSx,
  appbarSx,
  appStack1Sx,
  editProfileSx,
};
