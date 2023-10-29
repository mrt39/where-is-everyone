import { useState, useEffect } from 'react'
import '../styles/Leaderboard.css'
import LeaderboardTable from "./LeaderboardTable.jsx"


const Leaderboard = () => {

    const [data, setData] = useState();
    const [selectedScene, setSelectedScene] = useState();

    useEffect(() => {
      
/*         const fetchData = async () => {
        const response = await fetch('http://localhost:5000/leaderboard');
        const json = await response.json();
        setData(json)
        console.log(json)
      }
      
      fetchData();  */

        fetch('http://localhost:5000/leaderboard/'+ selectedScene)
          .then((res) => res.json())
          .then((jsondata) => {
            setData(jsondata)
          })
          .catch((err) => {
            console.log(err.message);
          }); 

    }, [selectedScene])


    return (
      <div className='leaderboardContainer'>
        <a href="#" onClick={() => setSelectedScene("star-wars")}>Star Wars </a>
        <br />
        <a href="#" onClick={() =>  setSelectedScene("festival")}>Festival </a>
        <br />
        <a href="#" onClick={() =>  setSelectedScene("nozze-cana")}>Nozze de Cana </a>
        <div>
          <LeaderboardTable
          data={data}/>
        </div>
        <div>
          {data? 
              <ul>
              {data.map((player) =>
                <li key={player.name}>
                  {player.name}
                </li>
              )}
            </ul>
        :""}  
        </div>
      </div>
    );
  };
  
  export default Leaderboard;
