import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";

const CustomBtn = React.memo(
  ({
    name = "button",
    icon,
    variant = "contained",
    color = "primary",
    width,
    height = "max-content",
    borderRadius,
    py = "8px",
    px = "16px",
    textVariant = "body1",
    textColor = "white",
    border,
    borderColor,
    ...props
  }) => {
    return (
      <Button
        {...props}
        variant={variant}
        color={color}
        startIcon={icon}
        sx={{
          width,
          height,
          borderRadius,
          border,
          borderColor,
          py,
          px,
          "&:hover": {
            border,
            borderColor,
          },
        }}
      >
        <Typography
          textTransform='none'
          fontWeight={600}
          variant={textVariant}
          color={textColor}
        >
          {name}
        </Typography>
      </Button>
    );
  }
);

export default CustomBtn;
