import * as React from 'react';
import '../styles/Navbar.css'
import { Link } from "react-router-dom";



export default function Navbar({scene}) {
  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        <Link className="navbar-brand" to="/">Where is Everyone?</Link>
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="#">Leaderboard</a>
          </li>
        </ul>
      </div>
      <div>
        <a className="nav-link" href="#">Leaderboard</a>
      </div>
    </div>
  </nav>
  );
}