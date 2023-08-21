"use client";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import CustomBtn from "@components/Button";
import {
  createPostSx,
  dropzoneBoxSx,
  dropzoneStacksx,
  postImagesx,
} from "@utils/styles";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dropzone from "react-dropzone";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@state";
import axios from "axios";

const CreatePost = () => {
  const { data: session } = useSession();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handlePost = async e => {
    e.preventDefault();
    if (!image) alert("Please select an image");
    const formData = new FormData();
    formData.append("userId", user._id);
    post === ""
      ? formData.append("description", " ")
      : formData.append("description", post);

    formData.append("email", user.email);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    try {
      const response = await axios.post("/api/post", formData);
      dispatch(setPosts(response.data));
      setPost("");
      setImage(null);
      setIsImage(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack sx={createPostSx}>
        <Stack sx={{ alignItems: "center", flexDirection: "row", flex: "3" }}>
          <Avatar
            sx={{ width: "28px", height: "28px" }}
            src={session?.user.image}
            alt={session?.user.name}
          />
          <TextField
            onChange={e => setPost(e.target.value)}
            autoComplete='off'
            value={post}
            placeholder={`What's on your mind, ${
              session?.user.name.split(" ")[0]
            }?`}
            fullWidth
            sx={{
              "& fieldset": { border: "none" },
              p: "0",
            }}
          />
        </Stack>

        <form onSubmit={handlePost}>
          <Stack direction='row' spacing={1} alignItems='center'>
            <IconButton
              aria-label='add photo'
              onClick={() => setIsImage(!isImage)}
            >
              <InsertPhotoOutlinedIcon fontSize='large' />
            </IconButton>
            <CustomBtn
              name='Post'
              width='64px'
              height='32px'
              px='24px'
              py='10px'
              borderRadius='16px'
              type='submit'
            />
          </Stack>
        </form>
      </Stack>
      {isImage && (
        <Box sx={postImagesx}>
          <Dropzone
            acceptedfiles={["image/*"]}
            multiple={false}
            onDrop={acceptedFiles => {
              setImage(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <Stack sx={dropzoneStacksx}>
                <Box {...getRootProps()} sx={dropzoneBoxSx}>
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image</p>
                  ) : (
                    <Stack sx={dropzoneStacksx}>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </Stack>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => {
                      setImage(null);
                    }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </Stack>
            )}
          </Dropzone>
        </Box>
      )}
    </>
  );
};

export default CreatePost;
