import React from "react";
import { CircularProgress, Button as MuiButton } from "@mui/material";
import { ButtonProps } from "./Button.interface";

const Button: React.FC<ButtonProps> = ({
  className = "",
  label,
  labelClass = "",
  type = "button",
  outlined = false,
  disabled = false,
  onClick,
  color = "primary",
  icon,
  showLoader=false,
}) => (
  <MuiButton
    className={`!normal-case ${className} relative`}
    variant={outlined ? "outlined" : "contained"}
    type={type}
    disabled={disabled}
    onClick={onClick}
    disableFocusRipple
    color={color}
    startIcon={icon}
  >
    {showLoader && <div className='flex justify-center items-center h-56 absolute'>
      <CircularProgress color="inherit" />
    </div>}
    <span className={labelClass}>{label}</span>
  </MuiButton>
);

export default Button;
