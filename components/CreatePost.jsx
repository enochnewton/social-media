import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import CustomBtn from "@components/Button";

const CreatePost = () => (
  <Stack
    direction='row'
    sx={{
      alignItems: "center",
      bgcolor: "bg.main",
      justifyContent: "space-between",
      px: "22px",
      py: "8px",
      borderRadius: "40px",
      border: "1px solid",
      borderColor: "secondary.border",
      mb: "24px",
    }}
  >
    <Stack
      direction='row'
      sx={{
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{ width: "28px", height: "28px" }}
        src='/profile-1.jpg'
        alt='Jane Doe'
      />
      <TextField
        placeholder='Whats on your mind Selena?'
        fullWidth
        sx={{
          "& fieldset": { border: "none" },
          p: "0",
        }}
      />
    </Stack>
    <Stack direction='row' spacing={1} alignItems='center'>
      <IconButton aria-label='add photo'>
        <InsertPhotoOutlinedIcon fontSize='large' />
      </IconButton>
      <CustomBtn
        name='Post'
        width='64px'
        height='32px'
        px='24px'
        py='10px'
        borderRadius='16px'
      />
    </Stack>
  </Stack>
);

export default CreatePost;
