import * as React from 'react';
import { useEffect } from 'react';
import '../styles/Navbar.css'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Timer from './Timer.jsx';
import HeaderImg from "../assets/images/header.png"

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
      <div className="navbar-brand">
         <Link className='navbarHeaderImg' onClick={() => handleLogoClick()}
        to="/">  <img className='navbarHeaderImg' src={HeaderImg} alt="" /> </Link> 
      </div>
      { scene?
      <div className='navbarRightSideContainer'>
        <div className='navbarCharactersContainer'>
       <Stack direction="row" spacing={2}>
        {targetCharacters[scene].map((character) =>
          <div key={character.name} className={`navbarAvatarContainer ${character.found? "characterFound" : null}`}>
              <Avatar alt={character.name} 
              className='navbarCharacterAvatar'
              src={`./src/assets/images/${character.name}.png`} 
              sx={{ width: 45, height: 45 }} 
              /> {character.name}
          </div>
        )}
      </Stack> 
      </div>
      <div className="nav-item dropdown dropdownBtn">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
          {targetCharacters[scene].map((character) =>
          <li key={character.name} className={`dropdown-character navbarAvatarContainer ${character.found? "characterFound" : null}`}>
              <Avatar alt={character.name} 
              className='navbarCharacterDropdownAvatar'
              src={`./src/assets/images/${character.name}.png`} 
              sx={{ width: 45, height: 45 }} 
              /> {character.name}
          </li>
        )}
          </ul>
        </div>
    <Timer
      time = {time}
      setTime = {setTime}
      isRunning = {isRunning}
      setIsRunning = {setIsRunning}
    />
      </div>
      : 
      <Link className="navbarLeaderboardLinkContainer" to="/leaderboard">
        <div className='navbarLeaderboardLinkDiv'>
          <p>Leaderboard</p>
        </div>
      </Link>
      }

    
  </nav>
  );
}