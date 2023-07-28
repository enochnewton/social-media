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
  width: { xs: "30px", sm: "50px" },
  height: { xs: "30px", sm: "50px" },
  padding: "15px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  borderRadius: "40px",
  background: "rgba(255, 255, 255, 0.33)",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  backdropFilter: "blur(3px)",
};

const formSx = {
  bgcolor: "secondary.form",
  borderRadius: "10px",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "transparent",
    "& fieldset": {
      borderColor: "transparent", // Set border color to transparent
    },
    "&:hover fieldset": {
      borderColor: "transparent", // Set border color to transparent on hover
    },
  },
};

const postContainerSx = {
  p: "12px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  width: "100%",
  border: "1px solid",
  borderColor: "secondary.border",
  borderRadius: "16px",
  bgcolor: "bg.main",
  mb: "24px",
};

const postTopSx = {
  height: "56px",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "stretch",
  flexDirection: "row",
};

const postImageStyles = {
  borderRadius: "8px",
  width: "100%",
  height: "270px",
  objectFit: "fill",
};

const postIconsSx = {
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "stretch",
  height: "40px",
  flexDirection: "row",
};

const postIconsInnerSx = {
  height: "40px",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "stretch",
  flexDirection: "row",
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
  formSx,
  postContainerSx,
  postTopSx,
  postImageStyles,
  postIconsSx,
  postIconsInnerSx,
};
