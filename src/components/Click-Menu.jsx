/* eslint-disable react/prop-types */
import {useState, useEffect} from "react";
import * as React from 'react';
import '../styles/Click-Menu.css';
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


export default function ClickMenu({setSnackBarOpen, manageSnackBarSettings, clickCoordinates, clickCoordinatesClientScreen, setclickMenuDisplay, handleModalOpen, setIsRunning, clickMenuDisplay, open, scene, targetCharacters, setTargetCharacters, targetCharactersWithCoordinates}) {


  
  function handleMenuClick(name) {
    //close the menu
    setclickMenuDisplay(null);

    //if the clicked character has correct coordinates, display success

    //as the image size adjusts to the current window size, coordinates of the characters will be calculated based on the current window size as well
    //coordinates are calculated based on the formula here: https://stackoverflow.com/questions/32870568/how-to-recalculate-x-y-coordinates-based-on-screensize 

    //image.width-image.height: https://stackoverflow.com/questions/623172/how-to-get-the-image-size-height-width-using-javascript
    
    let currentScreenSizeX= document.getElementsByClassName('gameImg')[0].width;
    let currentScreenSizeY= document.getElementsByClassName('gameImg')[0].height;  

    if (typeof name == "string"){

    if (between(clickCoordinates[0], targetCharactersWithCoordinates[scene][name]["X"][0] * currentScreenSizeX, targetCharactersWithCoordinates[scene][name]["X"][1] * currentScreenSizeX) && between (clickCoordinates[1], targetCharactersWithCoordinates[scene][name]["y"][0] * currentScreenSizeY, targetCharactersWithCoordinates[scene][name]["y"][1] * currentScreenSizeY)) {
        console.log("Found " + name)
        manageSnackBarSettings(true, name)
        setSnackBarOpen(true);
        /* turn the "found" property of the targetCharacters state to "true" */
        //find index
        var index = targetCharacters[scene].findIndex((character) => character.name === name);
        //copy the object
        const copiedobject = {...targetCharacters}
        //alter the copied object
        copiedobject[scene][index].found = true
        //change state
        setTargetCharacters(copiedobject)
        console.log(targetCharacters)
        //if all characters have been found, open the score entry modal
        if(targetCharacters[scene].every((character) => character.found === true)){
          handleModalOpen()
          //stop the timer
          setIsRunning(false);
        }
    }
    else{
      console.log("Couldn't find " + name)
      manageSnackBarSettings(false)
      setSnackBarOpen(true);
    }
  }
    
  }

  //check if the number is between range
  function between(x, min, max) {
    return x >= min && x <= max;
  }

  //convert string into kebab case
  function kebabCase (string) {
    return string.replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
  }

  return (
    <React.Fragment>
      <Menu
        anchorEl={clickMenuDisplay}
        id="account-menu"
        open={open}
        onClose={handleMenuClick}
        /* onClick={handleMenuClick} */
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0
            }
          }
        }}
        /* adjusting position for the menu to appear on mouse click position
        https://mui.com/material-ui/react-popover/#anchor-playground*/
        anchorReference="anchorPosition"
        anchorPosition={{ top: clickCoordinatesClientScreen[1]+40, left: clickCoordinatesClientScreen[0]-53 }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      > 
      {
        (() => {
          /* if scene isn't selected, don't render */
        if (scene)
            return ( targetCharacters[scene].map((character) =>
              <MenuItem className={character.found? "clickMenuCharacterFound" : null} key={character.name} onClick={() => handleMenuClick(character.name)}>
                <Avatar alt={character.name} src={`./src/assets/images/${kebabCase(character.name)}.png`} /> <p className="clickMenuCharacterAvatarName" >{character.name}</p>
              </MenuItem>
            ))
        })()
      } 

      
      </Menu>
    </React.Fragment>
  );
}
