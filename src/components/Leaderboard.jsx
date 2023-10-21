import { useState, useEffect } from 'react'
import '../styles/Leaderboard.css'
import LeaderboardTable from "./LeaderboardTable.jsx"


const Leaderboard = () => {

    const [data, setData] = useState();

    useEffect(() => {
      
/*         const fetchData = async () => {
        const response = await fetch('http://localhost:5000/leaderboard');
        const json = await response.json();
        setData(json)
        console.log(json)
      }
      
      fetchData();  */

        fetch('http://localhost:5000/leaderboard')
          .then((res) => res.json())
          .then((jsondata) => {
            setData(jsondata)
          })
          .catch((err) => {
            console.log(err.message);
          }); 

    }, [])


    return (
      <div>
        <h1>This is the leaderboard!</h1>
        <h1>This is the leaderboard!</h1>
        <h1>This is the leaderboard!</h1>
        <h1>This is the leaderboard!</h1>
        <h1>This is the leaderboard!</h1>
        <h1>This is the leaderboard!</h1>
        <h1>This is the leaderboard!</h1>
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
