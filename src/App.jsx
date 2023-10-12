/* import { useState } from 'react'
 */
import { Outlet } from "react-router-dom";
import './styles/App.css'
import Navbar from "./components/Navbar.jsx"





const App = () => {

  return (
    <div>
      <Navbar/>
      <Outlet /> 
    </div>
  );
};

export default App;

