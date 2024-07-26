import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import Button from '../Button/Button';
import { ModalProps } from './Modal.interface';

const Modal: React.FC<ModalProps> = ({ open, modalTitle, mainText, primaryBtnTitle, secondaryBtnTitle, handleClose, handleConfirm }) => {
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">
                    {modalTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {mainText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="mb-4 !flex !items-center !justify-center">
                    <Button onClick={handleClose} label={secondaryBtnTitle} className="w-40 !py-1 !py-3 !rounded-xl !bg-grey-mid dark:!bg-grey-light"/>
                    <Button onClick={handleConfirm} label={primaryBtnTitle} color="secondary" className="w-40 !py-3 !rounded-xl"/>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Modal;