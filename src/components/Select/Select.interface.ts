import { ReactNode, CSSProperties } from "react";

export interface Option {
  id: string | number;
  label: string;
}

export interface SelectProps {
  label?: string | React.ReactNode;
  onChange: (value: Option  | null) => void;
  options: Option[];
  placeholder?: string;
  name: string;
  id?: string;
  required?: boolean;
  hasError?: boolean;
  errMsg?: string;
  value: Option | null;
}
