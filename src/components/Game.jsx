import { useState, useEffect } from 'react';
import '../styles/Game.css';
import StarWars from "../assets/images/star-wars.jpg"
import ImageMarker from 'react-image-marker';
import ClickMenu from './Click-Menu';

export default function Game() {

  const [markers, setMarkers] = useState([]);
  const [clickMenuDisplay, setclickMenuDisplay] = useState(false);
  const [clickCoordinates, setclickCoordinates] = useState([])
  const [targetCharacters, setTargetCharacters] = useState([])
  const [targetCharacterCoordinates, settargetCharacterCoordinates] = useState({})

  const open = Boolean(clickMenuDisplay);
  const handleImageClick = (event) => {
    setclickMenuDisplay(event.currentTarget);
  };

  function getClickCoordinates(event) {
    let x = event.clientX;
    let y = event.clientY;
    setclickCoordinates([x, y])
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
    settargetCharacterCoordinates({"Darth Vader": {x: [0.9051, 0.9343], y: [0.2761, 0.3308] }, 
    "Mace Windu" : {x:"254-330" , y:"843-927"},
    "Chewbacca" : {x:"1517-1574" , y:"821-940"},
    "Mas Amedda": {x:"523-569" , y:"954-1047"},
    "Obi-Wan": {x:"419-446" , y:"578-673"} 
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
            open = {open}
            />
        </div>
    </div>
  );
}