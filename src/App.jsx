import { useState } from 'react'
import { Outlet } from "react-router-dom";
import './styles/App.css'
import Navbar from "./components/Navbar.jsx"





const App = () => {

  const [scene, setScene] = useState("");

  return (
    <div>
      <Navbar
      scene = {scene}
      />
      <Outlet 
      setScene = {setScene}
      /> 
    </div>
  );
};

export default App;

