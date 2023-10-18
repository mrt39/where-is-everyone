import { useState } from 'react'
import { Outlet } from "react-router-dom";
import './styles/App.css'
import Navbar from "./components/Navbar.jsx"
 




const App = () => {

  const [scene, setScene] = useState("");
  const [targetCharacters, setTargetCharacters] = useState({
    "Star Wars": ["Darth Vader", "Mace Windu", "Chewbacca", "Mas Amedda", "Obi-Wan"]
  });

  const targetCharactersWithCoordinates = {
  "Star Wars": {"Darth Vader": {"X": [0.8868, 0.9384], "y": [0.3725, 0.4246] },
  "Mace Windu" : {"X":[0.1355, 0.1751] , "y":[0.4770, 0.5324]},
  "Chewbacca" : {"X":[0.8087, 0.8541] , "y": [0.8219, 0.8674]},
  "Mas Amedda": {"X":[0.2653, 0.3179] , "y":[0.608, 0.6735]},
  "Obi-Wan": {"X":[0.2122, 0.2569] , "y":[0.1634, 0.2274]}}
}

  return (
    <div>
      <Navbar
      scene = {scene}
      />
      {/* "context" is how you pass props to Outlet: https://reactrouter.com/en/main/hooks/use-outlet-context */}
      <Outlet  context={[scene, setScene, targetCharacters, setTargetCharacters, targetCharactersWithCoordinates]} /> 
    </div>
  );
};

export default App;

