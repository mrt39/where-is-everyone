/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../styles/Dialog.css'

export default function GameStartDialog({setIsRunning}) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    //don't close the dialog modal when user clicks on the background
    if (reason === "backdropClick"){
        return
    }
    setOpen(false);
    setIsRunning(true)
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Find the characters specified above!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          When you find a character, click on its position and select its name from the menu that gets opened.
          Try to beat the high scores by finding all of the characters as quick as possible!
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialogButtonContainer'>
          <Button onClick={handleClose} autoFocus>
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}