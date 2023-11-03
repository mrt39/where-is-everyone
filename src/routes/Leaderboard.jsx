import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from 'react'
import '../styles/Leaderboard.css'
import LeaderboardTable from "../components/LeaderboardTable.jsx"


const Leaderboard = () => {

   {/* "useOutletContext" is how you get props from Outlet: https://reactrouter.com/en/main/hooks/use-outlet-context */}
    const [scene, setScene, targetCharacters, setTargetCharacters, targetCharactersWithCoordinates, time, ssetTime, isRunning, setIsRunning, selectedSceneOnLeaderboard,  setSelectedSceneOnLeaderboard] = useOutletContext();

    const [data, setData] = useState();


    useEffect(() => {
      
        fetch('http://localhost:5000/leaderboard/'+ selectedSceneOnLeaderboard)
          .then((res) => res.json())
          .then((jsondata) => {
            setData(jsondata)
          })
          .catch((err) => {
            console.log(err.message);
          }); 

    }, [selectedSceneOnLeaderboard])


    return (
      <div className='leaderboardContainer'>
        <div className='leaderboardSceneNamesContainer'>
          <a href="#" onClick={() => setSelectedSceneOnLeaderboard("star-wars")}>Star Wars </a>
          <br />
          <a href="#" onClick={() =>  setSelectedSceneOnLeaderboard("nozze-cana")}>Nozze de Cana </a>
          <br />
          <a href="#" onClick={() =>  setSelectedSceneOnLeaderboard("festival")}>Festival </a>
        </div>
        <div>
          <LeaderboardTable
          data={data}
          selectedSceneOnLeaderboard={selectedSceneOnLeaderboard}
          />
        </div>
      </div>
    );
  };
  
  export default Leaderboard;
