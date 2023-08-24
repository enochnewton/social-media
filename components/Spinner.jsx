import { Box } from "@mui/material";
import { DotLoader } from "react-spinners";

const Spinner = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "90vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DotLoader color='#2FA9ED' loading size={100} />
    </Box>
  );
};

export default Spinner;
