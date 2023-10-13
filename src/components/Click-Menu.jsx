/* eslint-disable react/prop-types */

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DarthVaderImg from "../assets/images/darth-vader.png"
import ChewbaccaImg from "../assets/images/chewbacca.png"
import MasAmeddaImg from "../assets/images/mas-amedda.png"
import MaceWinduImg from "../assets/images/mace-windu.png"
import ObiWanImage from "../assets/images/obi-wan.png"

export default function ClickMenu({clickCoordinates, setclickMenuDisplay, clickMenuDisplay, open, targetCharacterCoordinates}) {

  function handleMenuClick(name) {
    //close the menu
    setclickMenuDisplay(null);
    //if the clicked character has correct coordinates, display success
    /* console.log(targetCharacterCoordinates[name]["x"]) */
    /*console.log(window.innerWidth) */

    //as the image adjusts the current window size, coordinates of the characters will be calculated based on the current window size as well
    //coordinates are calculated based on the formula here: https://stackoverflow.com/questions/32870568/how-to-recalculate-x-y-coordinates-based-on-screensize 
    let currentScreenSizeX= window.innerWidth
    let currentScreenSizeY= window.innerHeight

    console.log("Clicked X coordinates should be between: " + targetCharacterCoordinates[name]["x"][0] * currentScreenSizeX + " and " + targetCharacterCoordinates[name]["x"][1] * currentScreenSizeX)

    if (between(clickCoordinates[0], targetCharacterCoordinates[name]["x"][0] * currentScreenSizeX, targetCharacterCoordinates[name]["x"][1] * currentScreenSizeX)) {
        console.log("Found Darth Vader!")
    }
    else{
      console.log("Couldn't find Darth Vader")
    }



    /* TODO: add the same check for dimension Y 
    if found, remove from the targetCharacters array so it doesn't get displayed
    */
    
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
        anchorPosition={{ top: clickCoordinates[1]+40, left: clickCoordinates[0]-53 }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleMenuClick("Darth Vader")}>
          <Avatar alt="Darth Vader" src={DarthVaderImg} /> Darth Vader
        </MenuItem>
        <MenuItem onClick={handleMenuClick}>
          <Avatar  alt="Mace Windu" src={MaceWinduImg} /> Mace Windu
        </MenuItem>
        <MenuItem onClick={handleMenuClick}>
          <Avatar  alt="Chewbacca" src={ChewbaccaImg} /> Chewbacca
        </MenuItem>
        <MenuItem onClick={handleMenuClick}>
          <Avatar  alt="Mas Amedda" src={MasAmeddaImg} /> Mas Amedda
        </MenuItem>
        <MenuItem onClick={handleMenuClick}>
          <Avatar  alt="Obi-Wan" src={ObiWanImage} /> Obi-Wan
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
