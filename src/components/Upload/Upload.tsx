import React, { useState } from "react";
import { Button, FormHelperText } from "@mui/material";
import {CloudUploadRounded,Cancel} from '@mui/icons-material';

import {
  IMAGE_TYPES,
  IMAGE_MAX_SIZE,
} from "../../utils/Constants";
import { UploadProps } from "./Upload.interface";

const Upload: React.FC<UploadProps> = ({
  accept = "image/*",
  onChange,
  required = false,
  disabled = false,
  img,
  name,
  className,
  onChangeError,
  id,
  backgroundImg,
  isInputHasErr,
  errMsg,
  uploadTypeError = "Please select a valid image type",
  uploadSizeError = "Max size is 5MB",
  uploadFileTitle,
  onClear,
  labelClassName
}) => {
  const [error, setError] = useState<string | null>(null);

  const validateImageFile = (imageFile: File): boolean => {
    if (!IMAGE_TYPES.includes(imageFile.type)) {
      setError(uploadTypeError);
      onChangeError && onChangeError(uploadTypeError);
      return false;
    }
    if (imageFile.size > IMAGE_MAX_SIZE) {
      setError(uploadSizeError);
      onChangeError && onChangeError(uploadSizeError);
      return false;
    }
    setError(null);
    onChangeError && onChangeError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (!validateImageFile(file)) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target?.result as string, file);
      }      
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className={className}>
      <input
        style={{ display: "none" }}
        id={id || "upload-file"}
        type="file"
        accept={accept}
        key={img}
        onChange={handleFileChange}
        required={required}
        disabled={disabled}
        name={name}
      />
      <label
        htmlFor={id || "upload-file"}
        className={`mt-2 ${labelClassName}`}
      >
        {img ? (
          <div>
            <div
              style={{ backgroundImage: `url(${img})` }}
              className="pointer relative"
            >
              <div
                className="absolute -right-4 bottom-0"
                onClick={(e) => {
                  e.preventDefault();
                  onClear && onClear();
                }
                }
              >
                <Cancel />
              </div>
            </div>
          </div>
        ) : (
          <Button
            variant="contained"
            component="div"
            className={`flex flex-col w-36 h-36 !rounded-xl ${!backgroundImg && "!bg-slate-400"}`}
            disabled={disabled}
            style={{ backgroundImage: `url(${backgroundImg})` }}
          >
            <div>
              <CloudUploadRounded />
            </div>
            <div className="text-center text-[#0071BC] leading-tight mt-2">
              {uploadFileTitle}
            </div>
          </Button>
        )}
      </label>
      <FormHelperText
        error={true}
      >
        {isInputHasErr
          ? errMsg : error}
      </FormHelperText>
    </div>
  );
};

export default Upload;
