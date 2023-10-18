/* eslint-disable react/prop-types */
import {useState} from "react";
import * as React from 'react';
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


export default function ClickMenu({setSnackBarOpen, manageSnackBarSettings, clickCoordinates, clickCoordinatesClientScreen, setclickMenuDisplay, clickMenuDisplay, open, scene, targetCharacters, targetCharactersWithCoordinates}) {

  
  function handleMenuClick(name) {
    //close the menu
    setclickMenuDisplay(null);
    //if the clicked character has correct coordinates, display success

    //as the image adjusts the current window size, coordinates of the characters will be calculated based on the current window size as well
    //coordinates are calculated based on the formula here: https://stackoverflow.com/questions/32870568/how-to-recalculate-x-y-coordinates-based-on-screensize 

    //scrollwidth-scrollheight: https://stackoverflow.com/questions/22675126/what-is-offsetheight-clientheight-scrollheight
    let currentScreenSizeX= document.documentElement.scrollWidth;
    let currentScreenSizeY= document.documentElement.scrollHeight;

    console.log("Clicked X coordinates for this character should be between: " + targetCharactersWithCoordinates[scene][name]["X"][0] * currentScreenSizeX + " and " + targetCharactersWithCoordinates[scene][name]["X"][1] * currentScreenSizeX)

    console.log("Clicked Y coordinates for this character should be between: " + targetCharactersWithCoordinates[scene][name]["y"][0] * currentScreenSizeY + " and " + targetCharactersWithCoordinates[scene][name]["y"][1] * currentScreenSizeY)

    console.log("Current screen size X = " + currentScreenSizeX)
    console.log("Current screen size Y = " + currentScreenSizeY)

    if (between(clickCoordinates[0], targetCharactersWithCoordinates[scene][name]["X"][0] * currentScreenSizeX, targetCharactersWithCoordinates[scene][name]["X"][1] * currentScreenSizeX) && between (clickCoordinates[1], targetCharactersWithCoordinates[scene][name]["y"][0] * currentScreenSizeY, targetCharactersWithCoordinates[scene][name]["y"][1] * currentScreenSizeY)) {
        console.log("Found " + name)
        manageSnackBarSettings(true, name)
        setSnackBarOpen(true);
    }
    else{
      console.log("Couldn't find " + name)
      manageSnackBarSettings(false)
      setSnackBarOpen(true);
    }
    
  }

  //check if the number is between range
  function between(x, min, max) {
    return x >= min && x <= max;
  }

  return (
    <React.Fragment>
      <Menu
        anchorEl={clickMenuDisplay}
        id="account-menu"
        open={open}
        onClose={handleMenuClick}
        onClick={handleMenuClick}
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

      {targetCharacters[scene].map((character) =>
        <MenuItem key={character} onClick={() => handleMenuClick(character)}>
          <Avatar alt={character} src={`./src/assets/images/${character}.png`} /> {character}
        </MenuItem>
      )}

      </Menu>
    </React.Fragment>
  );
}
