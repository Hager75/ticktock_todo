export interface UploadProps {
  accept?: string;
  onChange: (fileData: string | string[], file: File) => void;
  required?: boolean;
  disabled?: boolean;
  uploadFileTitle?:string;
  img?: string;
  name?: string;
  className?: string;
  labelClassName?:string;
  onChangeError?: (error: string | null) => void;
  id?: string;
  backgroundImg?: string;
  isInputHasErr?: boolean;
  errMsg?: string;
  uploadTypeError?:string;
  uploadSizeError?:string;
  onClear?: () => void;
}
