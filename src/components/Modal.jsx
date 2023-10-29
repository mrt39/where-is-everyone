import * as React from 'react';
import { useState } from 'react';
import '../styles/Modal.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function GameWonModal({gameWonModalOpen, setgameWonModalOpen, time, scene}) {


    const [input, setInput] = useState("")

    const handleClose = () => {
        setgameWonModalOpen(false);
    };


    function handleInputChange(event){
        setInput(event.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
        'http://localhost:5000/register', {
            method: "post",
            body: JSON.stringify({ input, time, scene }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            setInput("");
        }
    }

    function manageTime(){

        // Hours calculation
        const hours = Math.floor(time / 360000);

        // Minutes calculation
        const minutes = Math.floor((time % 360000) / 6000);

        // Seconds calculation
        const seconds = Math.floor((time % 6000) / 100);
    
        // Milliseconds calculation
        const milliseconds = time % 100;

        const timeDisplay = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`

        return timeDisplay
    }

    return (
        <div>
        <Dialog className="modalDialog" open={gameWonModalOpen} onClose={handleClose}>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogContent>
            <DialogContentText>
                You found all the characters in the picture. Submit your score to have your place on the leaderboard!
            </DialogContentText>
            <TextField
                margin="dense"
                id="name"
                label="Name"
                fullWidth
                variant="standard"
                value = {input}
                onChange={handleInputChange}
            />
            <TextField
            className='modalTimeDisplay'
            disabled
            id="outlined-disabled"
            label="Time"
            defaultValue="TimeValue"
            margin="dense"
            value = {manageTime()}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Don't Submit</Button>
            <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}