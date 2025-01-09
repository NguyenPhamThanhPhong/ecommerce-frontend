import { useEffect, useState } from 'react';
import { useSnackbarStore } from '../context/SnackbarContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SnackbarManager() {
  const { messages, consume } = useSnackbarStore();
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (!current && messages.length) {
      const next = messages[0];
      setCurrent(next);
      consume(); // Remove the current message from the stack
    }
  }, [messages, current, consume]);

  const handleClose = () => setCurrent(null);

  return current ? (
    <Snackbar
      open={!!current}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={current.status}
        color={current.status}
        variant='filled'
        sx={{
          width: '100%', fontSize: '18px', display: 'flex',
          justifyContent: 'center', alignItems: 'center'
        }}

      >
        {current.message}
      </Alert>
    </Snackbar>
  ) : null;
}
