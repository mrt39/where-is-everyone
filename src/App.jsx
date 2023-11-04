import { useState } from 'react'
import { Outlet } from "react-router-dom";
import './styles/App.css'
import Navbar from "./components/Navbar.jsx"
import Footer from './components/Footer.jsx';
import {targetCharactersWithCoordinates} from './components/CharacterData.js';


const App = () => {

  const [scene, setScene] = useState("");
  const [selectedSceneOnLeaderboard, setSelectedSceneOnLeaderboard] = useState("star-wars");

  const [targetCharacters, setTargetCharacters] = useState({
    "star-wars": [{name: "Darth Vader", found: false}, {name: "Mace Windu", found: false}, {name: "Chewbacca", found: false}, {name: "Mas Amedda", found: false}, {name: "Obi-Wan", found: false}],
    "festival": [{name: "Robin Hood", found: false}, {name: "Witch", found: false}, {name: "Adam", found: false}, {name: "Erato", found: false}, {name: "Edgar Allen Poe", found: false}],
    "nozze-cana": [{name: "The Bride", found: false}, {name: "Paolo Veronese", found: false}, {name: "The Butcher", found: false}, {name: "Hourglass (Vanity)", found: false}, {name: "Suleiman the Magnificent", found: false}],
  });
  // state to store time from stopwatch
    const [time, setTime] = useState(0);
  // state to check whether stopwatch is running
  const [isRunning, setIsRunning] = useState(false);


  return (
    <div className='appContainer'>
      <Navbar
      scene = {scene}
      setScene={setScene}
      targetCharacters = {targetCharacters}
      time = {time}
      setTime = {setTime}
      isRunning = {isRunning}
      setIsRunning = {setIsRunning}
      setTargetCharacters={setTargetCharacters}
      />
      {/* "context" is how you pass props to Outlet: https://reactrouter.com/en/main/hooks/use-outlet-context */}
      <Outlet  context={[scene, setScene, targetCharacters, setTargetCharacters, targetCharactersWithCoordinates, time, setTime, isRunning, setIsRunning, selectedSceneOnLeaderboard, setSelectedSceneOnLeaderboard]} /> 
      <Footer
      scene = {scene}
      />
    </div>
  );
};

export default App;


