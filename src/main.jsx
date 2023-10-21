import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import Leaderboard from "./components/Leaderboard.jsx";
import ChooseScene from './components/Choose-Scene.jsx';
import Game from './components/Game.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ChooseScene/> },
      { path: "leaderboard", element: <Leaderboard />},
      { path: "game", element: <Game />},

    ],

  },
/*   {
    path: "/profile",
    element: <Profile />,
  }, */
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

