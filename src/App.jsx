import { useState } from 'react'
import { Link, Outlet } from "react-router-dom";
import './styles/App.css'
import Navbar from "./components/Navbar.jsx"

const App = () => {
  return (
    <div>
      <Navbar/>
      <h1>Hello from the main page of the app!</h1>
      <p>Here are some examples of links to other pages</p>
      <nav>
        <ul>
{/*           <li>
            <Link to="profile">Profile page</Link>
          </li> */}
      <Outlet /> 
        </ul>
      </nav>
    </div>
  );
};

export default App;

