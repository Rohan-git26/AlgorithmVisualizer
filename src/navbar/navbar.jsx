import React from "react";
import "./navbar.css"

const NavBar = () => {
  const logo =
    window.innerWidth > 600 ? "Algorithm Visualizer" : "AlgoVisualizer";

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand h1 mb-0">{logo}</a>
      {/*  <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation" 
        
        >
        <span class="navbar-toggler-icon"></span> 
      </button> */}

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto" >
          <li class="nav-item active">
            <a class="nav-link" href="/"> Sorting
              {/* Home <span class="sr-only">(current)</span> */}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/pathFinding">
              PathFinding
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
