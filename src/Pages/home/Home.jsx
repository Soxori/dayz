import React from "react";
import "./Home.css";
import ArrowImage from "../../Images/ArrowRightShort.png";

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Lorem ipsum nevim něco</h1>
        </div>
      </section>

      <section className="features">
        <div className="feature-card toxic-zones">
          <div className="overlay-text">Toxic zones</div>
        </div>
        <div className="feature-card loot">
          <div className="overlay-text">10x loot</div>
        </div>
        <div className="feature-card helicopters">
          <div className="overlay-text">Helicopters</div>
        </div>
      </section>

      <span className="allMods-btn">
        <button className="all-mods" style={{background: 'none', border: 'none'}}>Show all mods</button>
        <img src={ArrowImage} alt="Arrow" className="arrow-right" />
      </span>
    </div>
  );
}
