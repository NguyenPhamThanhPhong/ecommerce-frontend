import { Modal, Box, Typography, Button, IconButton, Badge, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import theme from '@styles/GlobalStyles';


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



export default function SuccessModal({ open, onClose, title, status, content, onConfirm, onCancel, isConfirm, isCancel }) {

  const statusColor = status === 'success' ? theme.palette.success.dark : theme.palette.error.dark;

  const statusIcon = status === 'success' ?
    <CheckIcon sx={{ color: statusColor, height: '55px', width: '50px', }} />
    : <CloseIcon sx={{ color: statusColor, height: '55px', width: '50px', }} />;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description">
      <Stack sx={style}>
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