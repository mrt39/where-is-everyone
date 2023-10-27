import { useState } from 'react'
import { Outlet } from "react-router-dom";
import './styles/App.css'
import Navbar from "./components/Navbar.jsx"
 




const App = () => {

  const [scene, setScene] = useState();
  const [targetCharacters, setTargetCharacters] = useState({
    "star-wars": [{name: "Darth Vader", found: false}, {name: "Mace Windu", found: false}, {name: "Chewbacca", found: false}, {name: "Mas Amedda", found: false}, {name: "Obi-Wan", found: false}],
    "festival": [{name: "Edgar Allen Poe", found: false}, {name: "Witch", found: false}, {name: "Robin Hood", found: false}, {name: "Erato", found: false}, {name: "Adam", found: false}],
    "nozze-cana": [{name: "The Bride", found: false}, {name: "Paolo Veronese", found: false}, {name: "The Butcher", found: false}, {name: "Hourglass (Vanity)", found: false}, {name: "Suleiman the Magnificent", found: false}],
  });
  // state to store time from stopwatch
    const [time, setTime] = useState(0);
  // state to check whether stopwatch is running
  const [isRunning, setIsRunning] = useState(false);

  const targetCharactersWithCoordinates = {
  "star-wars": {"Darth Vader": {"X": [0.9053, 0.9542], "y": [0.3491, 0.4051]},
  "Mace Windu" : {"X":[0.1292, 0.1899] , "y":[0.4565, 0.5112]},
  "Chewbacca" : {"X":[0.8078, 0.8659] , "y": [0.8093, 0.8549]},
  "Mas Amedda": {"X":[0.2679, 0.3185] , "y":[0.6011, 0.6660]},
  "Obi-Wan": {"X":[0.2101, 0.2553] , "y":[0.1458, 0.2026]}},

  "nozze-cana": {"The Bride": {"X": [0.0594, 0.0832], "y": [0.6564, 0.7864] },
  "Paolo Veronese" : {"X": [0.4294, 0.4770], "y": [0.6892, 0.7633] },
  "The Butcher" : {"X": [0.4943, 0.5727], "y": [0.4227, 0.5111] },
  "Hourglass (Vanity)": {"X": [0,4883, 0.5175], "y": [0,7974, 0,8229] },
  "Suleiman the Magnificent" : {"X": [0.1245, 0.1781], "y": [0.6073, 0.7124] },},

  "festival": {"Edgar Allen Poe": {"X": [0.2624, 0.3218], "y": [0.8483, 0.9184] },
  "Witch" : {"X": [0.1089, 0.1786], "y": [0.6418, 0.7223] },
  "Robin Hood" : {"X": [0.8289, 0.9002], "y": [0.6178, 0.6933] },
  "Erato": {"X": [0.8537, 0.9197], "y": [0.1609, 0.2423] },
  "Adam" : {"X": [0.3754, 0.4278], "y": [0.1075, 0.1818] },},

  
}

  return (
    <div>
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
      <Outlet  context={[scene, setScene, targetCharacters, setTargetCharacters, targetCharactersWithCoordinates, time, setTime, isRunning, setIsRunning]} /> 
    </div>
  );
};

export default App;

