import { FormControl, Stack, TextField, Typography } from "@mui/material";
import { formSx } from "@utils/styles";
import React from "react";
import CustomBtn from "./Button";
import EditIcon from "@mui/icons-material/Edit";

const Form = React.memo(({ userProfile }) => {
  return (
    <>
      <Typography
        variant='h4'
        sx={{ textAlign: "center", mb: { xs: "16px", sm: "32px" } }}
      >
        {userProfile ? "About Jane Doe" : "About You"}
      </Typography>
      <FormControl>
        <Stack sx={{ mb: "12px" }}>
          <Typography variant='h5' color='text.secondary'>
            First Name
          </Typography>
          <TextField sx={formSx} type='text' id='first-name' size='large' />
        </Stack>
        <Stack sx={{ mb: "12px" }}>
          <Typography variant='h5' color='text.secondary'>
            Second Name
          </Typography>
          <TextField sx={formSx} type='text' id='first-name' size='large' />
        </Stack>
        <Stack sx={{ mb: "12px" }}>
          <Typography variant='h5' color='text.secondary'>
            Location
          </Typography>
          <TextField sx={formSx} type='text' id='first-name' size='large' />
        </Stack>
        <Stack sx={{ mb: "12px" }}>
          <Typography variant='h5' color='text.secondary'>
            Occupation
          </Typography>
          <TextField sx={formSx} type='text' id='first-name' size='large' />
        </Stack>

        <CustomBtn
          icon={<EditIcon color='text.primary' />}
          fullWidth
          variant='outlined'
          name='Update Profile'
          my='32px'
          py='16px'
          px='32px'
          color='button'
          border='2px solid'
          borderColor='button.main'
          textColor='button.main'
          borderRadius='12px'
        />
      </FormControl>
    </>
  );
});

export default Form;
