const desktopSx = {
  bgcolor: { xs: "inherit", md: "bg.main" },
  px: { xs: "4px", sm: "16px" },
  pt: "8px",
  borderRadius: "8px",
  overflow: "auto",
  mt: { xs: "-20px", sm: "0" },
  flexDirection: "column",
  scrollbarWidth: "none" /* Firefox */,
  "&::-webkit-scrollbar": {
    display: "none" /* Chrome */,
  },
  width: "100%",
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
  overflow: "hidden",
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
  objectFit: "cover",
  objectPosition: "center",
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

const chatHeaderSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "stretch",
  py: "8px",
  px: "8px",
  bgcolor: "bg.main",
  position: "fixed",
  right: "0",
  left: "0",
  gap: "12px",
};

const chatSenderSx = {
  position: "fixed",
  bottom: "8px",
  width: { xs: "95%", sm: "65%" },
  mx: "auto",
  display: "flex",
  justifyContent: "space-between",
  height: "3.5rem",
  alignItems: "center",
  gap: "8px",
  borderRadius: "1rem",
  alignSelf: "end",
  flexDirection: "row",
  bgcolor: "bg.main",
  px: "16px",
  left: "0",
  right: "0",
};

const loginContainerSx = {
  flexDirection: "row",
  mt: "-93px",
  height: "100vh",
  mx: "auto",
};

const loginCenterSx = {
  alignItems: "center",
  justifyContent: "space-evenly",
  mx: "auto",
};

const profileStack1sx = {
  height: { xs: "150px", sm: "200px" },
  backgroundImage: "url(/profile-bg.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  justifyContent: "flex-end",
  position: "relative",
};

const profileStack2sx = {
  flexDirection: "row",
  alignItems: "center",
  position: "absolute",
  top: { xs: "120px", sm: "150px" },
  right: "0",
  left: "0",
};

const profileStack3sx = {
  flex: "2",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const profileAvatarSx = {
  width: { xs: "50px", sm: "90px" },
  height: { xs: "50px", sm: "90px" },
};

const createPostSx = {
  alignItems: "center",
  bgcolor: "bg.main",
  justifyContent: "space-between",
  px: "22px",
  py: "8px",
  borderRadius: "40px",
  border: "1px solid",
  borderColor: "secondary.border",
  mb: "24px",
  flexDirection: "row",
};

const dropzoneStacksx = {
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
};

const personDetailsSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "stretch",
  py: "8px",
  mb: "8px",
};

const chatBoxSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "stretch",
  py: "8px",
  mb: "8px",
};

const chatStacksx = {
  flexDirection: "column",
  gap: "0.5rem",
  py: "1.5rem",
  overflow: "auto",
  mb: "5rem",
};

const postImagesx = {
  borderColor: "secondary.border",
  borderRadius: "5px",
  p: "8px",
  border: "1px dashed",
  mb: "1rem",
};

const dropzoneBoxSx = {
  "&:hover": { cursor: "pointer" },
  p: "10px",
  width: "100%",
};

const desktopDrawerSx = {
  textAlign: "center",
  width: { xs: "80%", sm: "calc(40vw - 100px)", md: "auto" },
  mx: "auto",
};

const footerSx = {
  width: "80%",
  mx: "auto",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  bottom: "20px",
  gap: "24px",
};

const commentListSx = {
  overflow: "auto",
  width: "100%",
  width: "100%",
  bgcolor: "bg.comment",
  p: "4px 2px",
  borderRadius: "4px",
};

const commentListItemSx = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
};

const postCommentSx = {
  alignItems: "center",
  bgcolor: "bg.main",
  justifyContent: "space-between",
  px: "14px",
  py: "4px",
  borderRadius: "10px",
  border: "1px solid",
  borderColor: "secondary.border",
  flexDirection: "row",
  width: "100%",
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
  chatHeaderSx,
  chatSenderSx,
  loginContainerSx,
  loginCenterSx,
  profileStack1sx,
  profileStack2sx,
  profileStack3sx,
  profileAvatarSx,
  createPostSx,
  dropzoneStacksx,
  personDetailsSx,
  chatBoxSx,
  chatStacksx,
  postImagesx,
  dropzoneBoxSx,
  desktopDrawerSx,
  footerSx,
  commentListSx,
  commentListItemSx,
  postCommentSx,
};
