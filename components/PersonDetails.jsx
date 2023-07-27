import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import CustomBtn from "./Button";
import React from "react";

const PersonDetails = React.memo(
  ({ chat, friends, newFriends, friendRequests, data }) => {
    return (
      <>
        {data.map(data => (
          <React.Fragment key={data.id}>
            <Box
              component='article'
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
                py: "8px",
                mb: "8px",
              }}
            >
              {/* profile */}
              <Stack direction='row' alignItems='center' gap={2}>
                <Avatar
                  src={data.avatar}
                  alt={data.sender}
                  sx={{ width: "50px", height: "50px" }}
                />
                <Stack direction='column' alignItems='flex-start' gap={1}>
                  <Typography
                    variant='h5'
                    fontWeight={400}
                    color='text.primary'
                  >
                    {data.sender}
                  </Typography>
                  {chat && (
                    <Typography variant='h6' color='text.secondary'>
                      {data.message}
                    </Typography>
                  )}
                </Stack>
              </Stack>

              {/* right side */}
              <>
                {/* messages */}
                {chat && (
                  <Typography variant='h6' color='text.primary'>
                    {data.time}
                  </Typography>
                )}
                {/* find new friends */}
                {newFriends && (
                  <CustomBtn name='Add' icon={<PersonAddIcon color='icon' />} />
                )}
                {/* friend requests */}
                {friendRequests && (
                  <Stack direction='row' alignItems='center' gap={1}>
                    <CustomBtn
                      py='6px'
                      border='2px solid'
                      borderColor='primary.main'
                      px='12px'
                      name='Add'
                    />
                    <CustomBtn
                      py='6px'
                      px='12px'
                      name='Remove'
                      variant='outlined'
                      color='button'
                      border='2px solid'
                      borderColor='button.main'
                      textColor='button.main'
                    />
                  </Stack>
                )}
              </>
            </Box>
            <Divider sx={{ color: "button.main" }} />
          </React.Fragment>
        ))}
      </>
    );
  }
);

export default PersonDetails;
