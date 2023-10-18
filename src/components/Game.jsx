import { useState, useEffect } from 'react';
import '../styles/Game.css';
import StarWars from "../assets/images/star-wars.jpg"
import ImageMarker from 'react-image-marker';
import ClickMenu from './Click-Menu';
import $ from 'jquery';


export default function Game() {

  const [markers, setMarkers] = useState([]);
  const [clickMenuDisplay, setclickMenuDisplay] = useState(false);
  const [clickCoordinates, setclickCoordinates] = useState([]);
  const [clickCoordinatesClientScreen, setclickCoordinatesClientScreen] = useState([])
  const [targetCharacters, setTargetCharacters] = useState([]);
  const [targetCharacterCoordinates, settargetCharacterCoordinates] = useState({});

  const open = Boolean(clickMenuDisplay);
  const handleImageClick = (event) => {
    setclickMenuDisplay(event.currentTarget);
  };

  function getClickCoordinates(event) {

    /* pageX/Y coordinates are relative to the top left corner of the whole rendered page (including parts hidden by scrolling),
    https://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y */
    let x = event.pageX;
    let y = event.pageY; 

    //clicked coordinates based on client's screen
    let clientScreenX = event.clientX;
    let clientScreenY = event.clientY;


/*     //get the coordinates in relation to viewport 
    //https://stackoverflow.com/questions/71296608/get-vw-vh-position-from-onclick-event-in-js
    let viewportX = x / window.innerWidth * 100 
    let viewportY = y / window.innerHeight * 100  */

/*     // e = Mouse click event.
    var rect = event.target.getBoundingClientRect();
    var x = event.clientX - rect.left; //x position within the element.
    var y = event.clientY - rect.top;  //y position within the element.
    console.log("Left : " + x + " ; Top : " + y + "."); */


    setclickCoordinates([x, y])
    setclickCoordinatesClientScreen([clientScreenX, clientScreenY])
    console.log("You clicked on these coordinates: " + clickCoordinates)
  }

  //custom marker setting for image marker: https://www.npmjs.com/package/react-image-marker
  const CustomMarker = () => {
    return (
        <div className="custom-marker" data-testid="marker"></div>
    );
  };



  //create characters for finding in game 
  function createCharacters(){
    setTargetCharacters(["Darth Vader", "Mace Windu", "Chewbacca", "Mas Amedda", "Obi-Wan"])
    /* coordinates are calculated based on the formula here: https://stackoverflow.com/questions/32870568/how-to-recalculate-x-y-coordinates-based-on-screensize  */
    settargetCharacterCoordinates({"Darth Vader": {"x": [0.8868, 0.9384], "y": [0.3725, 0.4246] },
    "Mace Windu" : {"x":[0.1355, 0.1751] , "y":[0.4770, 0.5324]},
    "Chewbacca" : {"x":[0.8087, 0.8541] , "y": [0.8219, 0.8674]},
    "Mas Amedda": {"x":[0.2653, 0.3179] , "y":[0.608, 0.6735]},
    "Obi-Wan": {"x":[0.2122, 0.2569] , "y":[0.1634, 0.2274]}
  })
  }

  //create characters once the page is loaded
  useEffect(() => {
    createCharacters()
  }, [])


  return (
    <div className='game-container'>
        <div
        onClick={() =>  {handleImageClick(event); getClickCoordinates(event);}}>
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
            clickCoordinates= {clickCoordinates}
            clickMenuDisplay = {clickMenuDisplay}
            setclickMenuDisplay = {setclickMenuDisplay}
            targetCharacterCoordinates = {targetCharacterCoordinates}
            clickCoordinatesClientScreen = {clickCoordinatesClientScreen}
            open = {open}
            />
        </div>
    </div>
  );
}