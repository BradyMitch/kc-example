import { Box, Dialog } from '@mui/material';
import React, { ReactNode } from 'react';

import ModalHeader from './ModalHeader';

interface IModalProps {
  onClose: Function;
  open: boolean;
  maxHeight?: string | number;
  bodyMargin?: string | number;
  width?: string | number;
  title: string;
  children: ReactNode;
}

/**
 * Reusable Modal component (popup window).
 * @param props
 * @param {Function} onClose - Function to handle closing state.
 * @param {boolean} open - If the modal is open.
 * @param {string | number} maxHeight - (optional) Custom maxHeight of the modal.
 * @param {string | number} bodyMargin - (optional) Custom margin of the modal body.
 * @param {string | number} width - (optional) Custom width of the modal.
 * @param {string} title - Title of the modal.
 * @param {reactNode} children - Child components of the modal.
 */
const Modal = (props: IModalProps) => {
  const {
    onClose,
    open,
    maxHeight = 500,
    bodyMargin = '10px',
    width = '300px',
    title,
    children,
  } = props;

  return (
    <Dialog
      onClose={() => onClose()}
      open={open}
      PaperProps={{
        sx: {
          maxHeight,
          maxWidth: 1000,
        },
      }}
    >
      <ModalHeader title={title} onClose={onClose} />
      <Box sx={{ m: bodyMargin, width }}>{children}</Box>
    </Dialog>
  );
};

export default Modal;
