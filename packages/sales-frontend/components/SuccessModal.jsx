import React, { useState } from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function SuccessModal() {
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open Payment Modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography id="modal-title" variant="h6" align="center" gutterBottom>
            Successful Payment
          </Typography>
          <Typography variant="body2" color="text.secondary">Payment type</Typography>
          <Typography variant="body2">Net Banking</Typography>
          <Typography variant="body2" color="text.secondary">Phone number</Typography>
          <Typography variant="body2">+12345678910</Typography>
          <Typography variant="body2" color="text.secondary">Email</Typography>
          <Typography variant="body2">JimmySmith1996@gmail.com</Typography>
          <Typography variant="body2" color="text.secondary">Transaction id</Typography>
          <Typography variant="body2">2345678910</Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="bold">
            Amount Paid
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            $543.02
          </Typography>
          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleClose}>
            Order Status
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
