export interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name: string;
  color?: string;
  labelClass?: string;
  id?: string;
  disabled?: boolean;
  checkboxClass?: string;
  checkBoxLabel?: string | JSX.Element;
  checkBoxLabelClass?: string;
}
