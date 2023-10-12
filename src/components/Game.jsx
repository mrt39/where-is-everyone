import { useState } from 'react';
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
    console.log(clickCoordinates)
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
        onClick={() =>  {handleImageClick(event); getClickCoordinates(event)}}>
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
            open = {open}
            />
        </div>
    </div>
  );
}