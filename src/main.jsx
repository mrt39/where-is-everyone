import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import Leaderboard from "./routes/Leaderboard.jsx";
import ChooseScene from './routes/Choose-Scene.jsx';
import Game from './routes/Game.jsx';


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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

