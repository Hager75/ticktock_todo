export interface DatePickerProps {
  value: string | null;  
  onChange: (date: string | null) => void;  
  name: string;  
  id?: string;  
  label: string;  
  required?: boolean; 
  isInputHasErr?: boolean;  
  errMsg?: string;  
  disablePast?: boolean;  
  format?: string;  
}