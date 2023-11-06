/* eslint-disable react/prop-types */

import * as React from 'react';
import '../styles/SnackBar.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar({snackBarOpen, setSnackBarOpen, snackBarSettings}) {


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };

  return (
      <Snackbar 
      open={snackBarOpen} 
      autoHideDuration={6000} 
      onClose={handleClose} 
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {snackBarSettings.success? 
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          You found {snackBarSettings.clickedName}!
        </Alert>
        : 
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        Try again!
        </Alert>
        }

      </Snackbar>
  );
}
