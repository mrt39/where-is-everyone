/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate  } from "react-router-dom";
import moment from 'moment';
import '../styles/Modal.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { clean } from 'profanity-cleaner';





export default function GameWonModal({gameWonModalOpen, setgameWonModalOpen, time, scene, setScene, setSelectedSceneOnLeaderboard}) {


    const navigate = useNavigate();

    const [nameInput, setNameInput] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleClose = () => {
        setgameWonModalOpen(false);
    };


    function handleInputChange(event){
        setNameInput(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault()
        setSubmitted(true)
    }

    useEffect(() => {
        async function postData() {

            let date = moment().format("MMMM Do YYYY, k:mm:ss")
            
            //on submit, clean the word with the profanity cleaner package
            //https://www.npmjs.com/package/profanity-cleaner
            let input = await clean(nameInput, { keepFirstAndLastChar: true })
            
            let result = await fetch(
            'https://where-is-everyone.vercel.app/register', {
                method: "post",
                body: JSON.stringify({ input, time, scene, date }),
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                }
            })
            result = await result.json();
            console.warn(result);
            if (result) {
                console.log("Data saved successfully");
                setNameInput("");
                setSelectedSceneOnLeaderboard(scene);
                setScene();
                navigate("/leaderboard"); 
                setSubmitted(false);
            }   
        }
        
        //after submit, redirect user to the leaderboard page
        if (submitted ===true){
        postData();
        }
    }, [submitted]);


    


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
                value = {nameInput}
                onChange={handleInputChange}
            />
            <TextField
            className='modalTimeDisplay'
            disabled
            id="outlined-disabled"
            label="Time"
            margin="dense"
            value = {manageTime()}
            />
            </DialogContent>
            <DialogActions>
            {submitted?     
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
            :
            <div>
                <Button onClick={handleClose}>Don't Submit</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
            }
            </DialogActions>
        </Dialog>
        </div>
    );
}