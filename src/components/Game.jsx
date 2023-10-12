import React, {useState} from 'react';
import '../styles/Game.css';
import StarWars from "../assets/images/star-wars.jpg"
import ImageMarker, { Marker, MarkerComponentProps } from 'react-image-marker';


export default function Game() {

  const [markers, setMarkers] = useState([]);

  const CustomMarker = () => {
    return (
        <div className="custom-marker" data-testid="marker"></div>
    );
};


  return (
    <div className='game-container'>
            {/* <img src={StarWars} alt="star-wars-image" /> */}
        <ImageMarker
        src={StarWars}
        markers={markers}
        onAddMarker={(marker) => setMarkers([marker])}
        markerComponent={CustomMarker}

      />
    </div>
  );
}