import * as React from 'react';
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
        src ={`./src/assets/images/frame-${clickedScene}.png`}
        alt="Photo of Cartagena's cathedral at the background and some colonial style houses"

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