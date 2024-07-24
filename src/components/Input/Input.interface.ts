import React from "react";
import { SxProps } from "@mui/system";

export interface InputProps {
  name: string;
  value: string | number;
  onChange: (value: string) => void;
  id?: string;
  label?: string ;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  isInputHasErr?: boolean;
  errMsg?: string;
  disabled?: boolean;
  inputEndAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  fullWidth?: boolean;
  helperText?: string | React.ReactNode;
  inputClass?: string;
  inputWrapperClass?: string;
  labelClassName?: string;
  helperTextClass?: string;
  labelAdornment?: string | React.ReactNode;
  boxLabelStyle?: SxProps;
}
