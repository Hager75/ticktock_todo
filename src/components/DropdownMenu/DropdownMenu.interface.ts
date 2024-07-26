import { ReactNode } from "react";

export interface DropdownProps {
  buttonText: string | ReactNode;
  menuItems: { label: string; onClick: () => void }[];
}
