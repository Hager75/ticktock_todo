import React from "react";
import {
  TextField,
  FormHelperText,
  Autocomplete,
  InputLabel,
} from "@mui/material";
import { WarningRounded } from "@mui/icons-material";

import { SelectProps, Option } from "./Select.interface";

const Select: React.FC<SelectProps> = ({
  value,
  label,
  options,
  placeholder,
  id,
  name,
  hasError,
  required,
  onChange,
  errMsg,
}) => {

  return (
    <div
      className="flex justify-center flex-col"
    >
      <InputLabel
        htmlFor={id || name }
        required={required}
      >
        {label}
      </InputLabel>

      <Autocomplete
        id={id || name}
        options={options}
        getOptionLabel={(option: Option) => option.label || ""}
        isOptionEqualToValue={(option: Option, value: Option) =>
          option?.id === value?.id
        }
        noOptionsText={"No options"}
        value={value}
        onChange={(e, value) => {          
          onChange(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={
              placeholder
            }
            required={required}
            error={hasError}
          />
        )}
        renderOption={(props, option, state) =>
          <li {...props} key={`${state.index}${option.id}`}>
            {option.label}
          </li>
        }
      />
      <FormHelperText
        error={hasError}
        className="flex items-center"
      >
        {errMsg?.trim() && hasError && (
          <>
            <WarningRounded className="me-1" color="error" />
            {errMsg}
          </>
        )}
      </FormHelperText>
    </div>
  );
};

export default Select;
