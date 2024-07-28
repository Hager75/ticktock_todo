export interface ButtonProps {
  className?: string;
  label: string;
  labelClass?: string;
  type?: "button" | "submit";
  outlined?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: "primary" | "secondary" | "error";
  icon?: React.ReactNode;
  showLoader?:boolean;
}
