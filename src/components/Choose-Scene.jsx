import * as React from 'react';
import { Link } from "react-router-dom";
{/* "useOutletContext" is how you get props from Outlet: https://reactrouter.com/en/main/hooks/use-outlet-context */}
import { useOutletContext } from "react-router-dom";
import '../styles/Choose-Scene.css';
import FrameStarWars from "../assets/images/frame-star-wars.png"



export default function ChooseScene() {

  const [scene, setScene] = useOutletContext();


  return (
    <div className='choose-scene-container'>
        Choose a Scene:
        <p>
        <Link to="leaderboard">Link to leaderboard</Link>
        </p>
    <Link to="game"
    onClick={function() {setScene("Star Wars"); console.log(scene)}}
    >
      <div className = "container">
        <div className = "card">
          <div className = "image">
            <img href = "#" src ={FrameStarWars}/>
          </div>
          <div className = "content">
            <h3>Star Wars</h3>
          </div>
        </div>    
      </div>
    </Link>
    </div>
  );
}