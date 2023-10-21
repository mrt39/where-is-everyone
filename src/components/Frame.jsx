import * as React from 'react';
import { Link } from "react-router-dom";
import '../styles/Frame.css';



export default function Frame({setScene, clickedScene, displayName}) {


  return (
    <Link to="game"
    onClick={function(){setScene(clickedScene);}}
    >
      <div className = "container">
        <div className = "card">
          <div className = "image">
            <img href = "#" src ={`./src/assets/images/frame-${clickedScene}.png`}/>
          </div>
          <div className = "content">
            <h3>{displayName}</h3>
          </div>
        </div>    
      </div>
    </Link>
  );
}