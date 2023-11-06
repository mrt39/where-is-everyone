/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import '../styles/Frame.css';




export default function Frame({setScene, clickedScene, displayName}) {


  return (
    <Link to="game"
    onClick={function(){setScene(clickedScene);}}
    >
    <article className="card">
      <img
        className="card__background"
        //images will be imported from the public directory 
        //https://vitejs.dev/guide/assets.html#the-public-directory
        src ={`/images/frame-${clickedScene}.png`}
        alt={clickedScene}

      />
      <div className="card__content | flow">
        <div className="card__content--container | flow">
          <h2 className="card__title">{displayName}</h2>
        </div>
      </div>
    </article>
    </Link>
  );
}