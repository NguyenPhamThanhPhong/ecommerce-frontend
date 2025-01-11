import { Modal, Box, Typography, Button, IconButton, Badge, Stack, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: '80%',
  fontFamily: 'inter',
  bgcolor: 'background.paper',
  boxShadow: 24,
  px: 4,
  pt: 3,
  pb: 4,
  borderRadius: 2,
};



export default function SuccessModal({ open, onClose, title, status, content, onConfirm, onCancel, isConfirm, isCancel,modalSx }) {
  const theme = useTheme();

  let statusColor;

  let statusIcon;

  if (status === 'success') {
    statusColor = theme.palette.success.dark;
    statusIcon = <CheckIcon sx={{ color: theme.palette.success.dark, height: '55px', width: '50px', }} />
  }
  else if (status === 'error') {
    statusColor = theme.palette.error.dark;
    statusIcon = <CloseIcon sx={{ color: theme.palette.error.dark, height: '55px', width: '50px', }} />
  }
  else if (status === 'info') {
    statusColor = theme.palette.info.dark;
    statusIcon = <InfoIcon sx={{ color: theme.palette.info.dark, height: '55px', width: '50px', }} />
  }
  else {
    statusColor = theme.palette.warning.dark;
    statusIcon = <WarningIcon sx={{ color: theme.palette.warning.dark, height: '55px', width: '50px', }} />
  }
  modalSx = modalSx || {};

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description">
      <Stack sx={{...style,...modalSx}}>
        <Badge badgeContent={<IconButton onClick={onClose} >
          <CloseIcon sx={{
            color: 'black',
          }} />
        </IconButton>} sx={{
          position: 'absolute',
          top: 27,
          right: 27
        }}>

        </Badge>
        <Box display="flex" justifyContent={'center'} alignItems="center" sx={{

        }}>
          <Box display={'inline-flex'} sx={{
            borderRadius: '50%',
            bgcolor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: theme.boxShadow.default,
            width: '80px',
            height: '80px',
          }}>
            {statusIcon}
          </Box>
        </Box>
        <Typography id="modal-title" variant="h6"
          mt={1}
          mb={5}
          align="center" gutterBottom sx={{
            color: statusColor,
          }}>
          {title}
        </Typography>
        {content ||
          <Typography id="modal-description" variant="body1" align="center" gutterBottom>
            Something went wrong. Please try again.
          </Typography>}
        <Box display="flex" justifyContent="space-between">
          {/* CancelButton */}
          {isCancel && <Button variant="contained" color="secondary" onClick={onCancel} sx={{
            height: '45px', px: 4, alignSelf: 'flex-end', mr: 2
          }}>
            Cancel
          </Button>}
          {isConfirm && <Button variant="contained" color="primary" onClick={onConfirm} sx={{
            height: '45px', px: 4, alignSelf: 'flex-end'
          }}>
            Confirm
          </Button>}
        </Box>

      </Stack>
    </Modal>
  );
}

