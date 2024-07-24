import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText,
  InputLabel
} from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined,WarningRounded} from "@mui/icons-material";
import { InputProps } from "./Input.interface";

const Input: React.FC<InputProps> = ({
  name,
  value,
  onChange,
  id,
  label,
  type = "text",
  placeholder,
  required = false,
  defaultValue,
  isInputHasErr,
  errMsg,
  disabled,
  startAdornment,
  endAdornment,
  fullWidth = true,
  helperText,
  inputClass,
  inputWrapperClass,
  labelClassName,
  helperTextClass,
  labelAdornment,
  inputEndAdornment,
  boxLabelStyle,
  ...props
}) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${inputWrapperClass}`}>
      <>
        <InputLabel
          htmlFor={id}
          required={required}
          className={labelClassName}
          sx={boxLabelStyle}
        >
          {label}
          {labelAdornment && <span className="ms-2">{labelAdornment}</span>}
        </InputLabel>
        <TextField
          id={id || name}
          name={name}
          type={showPassword ? "text" : type}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          error={isInputHasErr}
          fullWidth={fullWidth}
          InputLabelProps={{
            shrink: true,
            variant: "outlined",
          }}
          className={`${inputClass}`}
          autoComplete="off"
          InputProps={{
            startAdornment: startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : null,
            endAdornment:
              type === "password" ? (
                <InputAdornment position="end" className="me-4">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ) : (
                endAdornment
              ),
          }}
          {...props}
        />
        {inputEndAdornment}
      </>
      <FormHelperText
        error={isInputHasErr}
        className={`flex ${helperTextClass}`}
      >
        {errMsg?.trim() && isInputHasErr ? (
          <>
            <WarningRounded className="me-1" />
          </>
        ) : (
          helperText
        )}
      </FormHelperText>
    </div>
  );
};

export default Input;
