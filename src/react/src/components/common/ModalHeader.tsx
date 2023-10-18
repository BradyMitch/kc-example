import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, IconButton, Typography } from '@mui/material';
import React from 'react';

interface IModalHeaderProps {
  title: string;
  onClose: Function;
}

const ModalHeader = (props: IModalHeaderProps) => {
  const { title, onClose } = props;

  return (
    <DialogTitle>
      <Typography>{title}</Typography>
      <IconButton
        aria-label="close"
        onClick={() => onClose()}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};

export default ModalHeader;
