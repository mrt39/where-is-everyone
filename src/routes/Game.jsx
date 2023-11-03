import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../styles/Game.css';
import ImageMarker from 'react-image-marker';
import ClickMenu from '../components/Click-Menu';
import SnackBar from "../components/SnackBar";
import GameWonModal from "../components/Modal";


export default function Game() {

   const navigate = useNavigate(); 

  {/* "useOutletContext" is how you get props from Outlet: https://reactrouter.com/en/main/hooks/use-outlet-context */}
  const [scene, setScene, targetCharacters, setTargetCharacters, targetCharactersWithCoordinates, time, ssetTime, isRunning, setIsRunning, selectedSceneOnLeaderboard,  setSelectedSceneOnLeaderboard] = useOutletContext();

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
    //if scene is selected (if the user chooses a scene from the homepage) start the timer.
    if(scene){
      setIsRunning(true);
    } else {
    //if it isn't selected and user has accessed /game route via refreshing or manually typing, redirect to homepage.
      navigate("/"); 
    }
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

    //clicked coordinates based on client's screen, calculating for making menu appear on screen after click.
    let clientScreenX = event.clientX;
    let clientScreenY = event.clientY;

    setclickCoordinatesClientScreen([clientScreenX, clientScreenY])

    //find the clicked coordinates ON THE image, not the screen size.
    //https://stackoverflow.com/questions/49807088/javascript-get-x-y-coordinates-of-click-in-image
    var xCoordinate = event.offsetX;
    var yCoordinate = event.offsetY;

    console.log("Clicked X coordinate: " + xCoordinate)
    console.log("Clicked Y coordinate: " + yCoordinate)

     setclickCoordinates([xCoordinate, yCoordinate])  


  }


  //add class to the image which is rendered by the imagemarker component, based on the scene. this will set up the aspect ratio of the image.
  function addClasstoImg (){
     if (scene == "star-wars"){
      return "gameImg class-starWars"
    } else if (scene == "nozze-cana"){
      return "gameImg class-nozzeCana"
    } else if (scene == "festival"){
      return "gameImg class-festival"
    } 
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
        onClick={() =>  {/* clickImage(event); */ handleImageClick(event); getClickCoordinates(event); setSnackBarOpen(false)}}>
            <ImageMarker
            /* using imageMarket to get a marker on image onclick 
            https://www.npmjs.com/package/react-image-marker */
            src={`./src/assets/images/${scene}.jpg`}
            markers={markers}
            onAddMarker={(marker) => setMarkers([marker])}
            markerComponent={CustomMarker}
            alt={"game image"}
            extraClass={ addClasstoImg()}  
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
        scene = {scene}
        setScene={setScene}
        setSelectedSceneOnLeaderboard= {setSelectedSceneOnLeaderboard}
        />
    </div>
    
  );
}