import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { InputLabel, FormHelperText } from "@mui/material";
import { WarningRounded } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en";

import { DatePickerProps } from "./DatePicker.interface";

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  name,
  id,
  label,
  required = false,
  isInputHasErr,
  errMsg,
  disablePast,
  format = "DD/MM/YYYY",
}) => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [invalidDate, setInvalidDate] = useState(false);

  useEffect(() => {
    if (value) {
      const formattedDate = dayjs(value, "DD/MM/YYYY");
      setDate(formattedDate);
    }
  }, [value]);

  const handleDateChange = (selectedDate: Dayjs | null) => {
    const year = selectedDate?.year();
    const now = dayjs();
    if ((selectedDate && selectedDate.format("DD/MM/YYYY") === "Invalid Date") ||
      (selectedDate?.isValid() && year && year.toString()?.length < 4) ||
      (selectedDate && selectedDate.isBefore(now, 'day'))) {
      setInvalidDate(true);
    } else {
      setInvalidDate(false);
      setDate(selectedDate);
      const formattedDate = selectedDate ? selectedDate.format("DD/MM/YYYY") : null;
      onChange(formattedDate);
    }
  };

  return (
    <div id={id || name} className="w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <InputLabel htmlFor={id || name} required={required}>
          {label}
        </InputLabel>
        <MuiDatePicker
          name={name}
          closeOnSelect={false}
          disablePast={disablePast}
          format={format}
          onChange={(value) => handleDateChange(value)}
          value={date}
          defaultValue={date}
          className="w-full"
          slotProps={{
            actionBar: {
              actions: ["accept"],
            },
          }}
        />
      </LocalizationProvider>

      <FormHelperText
        error={invalidDate || isInputHasErr ? true : false}
        className="flex text-xTiny items-center"
      >
        {(invalidDate || isInputHasErr) && <WarningRounded className="me-1" color="error" />}
        {invalidDate ? "Invalid Date" : isInputHasErr && errMsg ? errMsg : ""}
      </FormHelperText>
    </div>
  );
};

export default DatePicker;
