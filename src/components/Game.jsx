import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../styles/Game.css';
import StarWars from "../assets/images/star-wars.jpg"
import ImageMarker from 'react-image-marker';
import ClickMenu from './Click-Menu';
import SnackBar from "./SnackBar";
import GameWonModal from "./Modal";


export default function Game() {

  {/* "useOutletContext" is how you get props from Outlet: https://reactrouter.com/en/main/hooks/use-outlet-context */}
  const [scene, setScene, targetCharacters, setTargetCharacters, targetCharactersWithCoordinates, time, setTime, isRunning, setIsRunning] = useOutletContext();

  const [markers, setMarkers] = useState([]);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarSettings, setSnackBarBarSettings] = useState({
    success: false,
    clickedName: ""
  });
  const [clickMenuDisplay, setclickMenuDisplay] = useState(false);
  const [clickCoordinates, setclickCoordinates] = useState([]);
  const [clickCoordinatesClientScreen, setclickCoordinatesClientScreen] = useState([])
  const [gameWonModalOpen, setgameWonModalOpen] = useState(false);


  //start timer when rendered first time
  useEffect(() => {
    setIsRunning(true);
  }, []);


  //open modal when game is won
  const handleModalOpen = () => {
    setgameWonModalOpen(true);
  };

  const open = Boolean(clickMenuDisplay);
  const handleImageClick = (event) => {
    //if all characters have been found, don't open any menu and return
    if(targetCharacters[scene].every((character) => character.found === true)){
      return
    }
    setclickMenuDisplay(event.currentTarget);
  };

  function manageSnackBarSettings(success, clickedName){
    setSnackBarBarSettings({success: success, 
      clickedName: clickedName})
  }

  function getClickCoordinates(event) {

    /* pageX/Y coordinates are relative to the top left corner of the whole rendered page (including parts hidden by scrolling),
    https://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y */
    let x = event.pageX;
    let y = event.pageY; 

    //clicked coordinates based on client's screen
    let clientScreenX = event.clientX;
    let clientScreenY = event.clientY;

    setclickCoordinates([x, y])
    setclickCoordinatesClientScreen([clientScreenX, clientScreenY])
    console.log("You clicked on these coordinates: " + clickCoordinates)
    console.log(scene)
  }

  //custom marker setting for image marker: https://www.npmjs.com/package/react-image-marker
  const CustomMarker = () => {
    return (
        <div className="custom-marker" data-testid="marker"></div>
    );
  };



  return (
    <div className='game-container'>
        <div
        onClick={() =>  {handleImageClick(event); getClickCoordinates(event); setSnackBarOpen(false)}}>
            <ImageMarker
            /* using imageMarket to get a marker on image onclick 
            https://www.npmjs.com/package/react-image-marker */
            src={StarWars}
            markers={markers}
            onAddMarker={(marker) => setMarkers([marker])}
            markerComponent={CustomMarker}
            />
        </div>
        <div >
            <ClickMenu
            scene={scene}
            targetCharacters= {targetCharacters}
            setTargetCharacters={setTargetCharacters}
            clickCoordinates= {clickCoordinates}
            clickMenuDisplay = {clickMenuDisplay}
            setclickMenuDisplay = {setclickMenuDisplay}
            handleModalOpen = {handleModalOpen}
            targetCharactersWithCoordinates = {targetCharactersWithCoordinates}
            clickCoordinatesClientScreen = {clickCoordinatesClientScreen}
            setSnackBarOpen = {setSnackBarOpen}
            manageSnackBarSettings={manageSnackBarSettings}
            open={open}
            setIsRunning={setIsRunning}
            />
        </div>
        {/* snackbar from MUI */}
        <SnackBar
        snackBarOpen = {snackBarOpen}
        setSnackBarOpen = {setSnackBarOpen}
        snackBarSettings = {snackBarSettings}
        />
        <GameWonModal
        gameWonModalOpen = {gameWonModalOpen}
        setgameWonModalOpen = {setgameWonModalOpen}
        time = {time}
        />
        
    </div>
  );
}