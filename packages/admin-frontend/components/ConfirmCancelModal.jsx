import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const ConfirmCancelModal = ({ open, onConfirm, onCancel }) => {
  return (
    <Modal open={open} onClose={onCancel} aria-labelledby="modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
          borderRadius: 2,
        }}
      >
        <WarningAmberIcon sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
        <Typography id="modal-title" variant="h6" mb={2}>
          Are you sure to delete this Item?
        </Typography>
        <Box display="flex" justifyContent="space-around" mt={2}>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmCancelModal;
