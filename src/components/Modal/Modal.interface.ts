import { ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  modalTitle: string | ReactNode;
  primaryBtnTitle: string;
  secondaryBtnTitle: string;
  handleConfirm: () => void;
  handleClose: () => void;
  mainText: string | ReactNode;
}
