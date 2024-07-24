import React from "react";
import {
  Checkbox as MuiCheckbox,
  FormGroup,
  FormControlLabel,
  InputLabel,
} from "@mui/material";

import { CheckboxProps } from "./Checkbox.interface";

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  name,
  color = "primary",
  labelClass,
  id,
  disabled,
  checkboxClass,
  checkBoxLabel,
  checkBoxLabelClass,
}) => (
  <>
    <FormGroup className={checkboxClass}>
      <InputLabel className={labelClass}>{label}</InputLabel>
      <FormControlLabel
        control={
          <MuiCheckbox
            className={checkBoxLabelClass}
            checked={checked}
            onChange={(e) => {
              onChange(e.target.checked);
            }}
            color={color as any}
            name={name}
            id={id || name}
            disabled={disabled}
          />
        }
        label={checkBoxLabel}
      />
    </FormGroup>
  </>
);

export default Checkbox;
