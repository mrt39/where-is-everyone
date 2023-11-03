import * as React from 'react';
import { Link } from "react-router-dom";
{/* "useOutletContext" is how you get props from Outlet: https://reactrouter.com/en/main/hooks/use-outlet-context */}
import { useOutletContext } from "react-router-dom";
import '../styles/Choose-Scene.css';
import Frame from '../components/Frame';



export default function ChooseScene() {

  const [scene, setScene, isRunning, setIsRunning] = useOutletContext();


  return (
    <>

    <div className='choose-scene-container'>
    <h1>        Choose a Scene:</h1>
        <div className="frame-container">

          <Frame
          setScene={setScene}
          clickedScene="star-wars"
          displayName="Star Wars"
          />
          <Frame
          setScene={setScene}
          clickedScene="nozze-cana"
          displayName="Nozze di Cana"
          />
          <Frame
          setScene={setScene}
          clickedScene="festival"
          displayName="Festival"
          />
          </div>
    </div>
    </>
  );
}