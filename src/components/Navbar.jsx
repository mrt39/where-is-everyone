import * as React from 'react';
import { useEffect } from 'react';
import '../styles/Navbar.css'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Timer from './Timer.jsx';

export default function Navbar({scene, targetCharacters, setTargetCharacters, time, setTime, isRunning, setIsRunning,setScene}) {


  function handleLogoClick(){
    //stop and reset the timer
    setIsRunning(false)
    setTime(0)
    //reset the scene
    setScene()

    /* turn all of the "found" key values to "unfound" on setTargetCharacters state */
    //copy the object
    const copiedobject = {...targetCharacters}
    //create a new array of objects, with all "found" properties turned to false
    const newArray = copiedobject[scene].map(character => ({...character, found: false}))
    //alter the copied object
    copiedobject[scene] = newArray
    //change state
    setTargetCharacters(copiedobject)
  }

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        <Link onClick={() => handleLogoClick()}
        className="navbar-brand" to="/">Where is Everyone?</Link>
      </a>
      { scene?
      <div className='navbarRightSideContainer'>
    <Timer
      time = {time}
      setTime = {setTime}
      isRunning = {isRunning}
      setIsRunning = {setIsRunning}
    />
      <Stack direction="row" spacing={2}>
        {targetCharacters[scene].map((character) =>
          <div key={character.name} className={`navbarAvatarContainer ${character.found? "characterFound" : null}`}>
              <Avatar alt={character.name} 
              src={`./src/assets/images/${character.name}.png`} 
              sx={{ width: 45, height: 45 }} 
              /> {character.name}
          </div>
        )}
      </Stack>
      <p className='navbarImageByTxt'>Image By xxxxxxx</p>
      </div>
      : 
      <div>
    
        <a href="#">
        <Link to="/leaderboard">Leaderboard</Link>
        </a>
        

      </div>
      }

    </div>
  </nav>
  );
}