import React from "react";
import { Button as MuiButton } from "@mui/material";
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
}) => (
  <MuiButton
    className={`!normal-case ${className}`}
    variant={outlined ? "outlined" : "contained"}
    type={type}
    disabled={disabled}
    onClick={onClick}
    disableFocusRipple
    color={color}
  >
    <span className={labelClass}>{label}</span>
  </MuiButton>
);

export default Button;
