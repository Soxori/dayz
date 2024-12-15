import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { ReactComponent as DiscordSVG } from "../../Images/discord.svg";
import { ReactComponent as Hamburger } from "../../Images/hamburger.svg";
import { ReactComponent as Close } from "../../Images/x.svg";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const currentPlayers = 85;
  const maxPlayers = 105;

  useEffect(() => {
    function handleClickOutside(e) {
      // If sidebar is open and click is outside sidebar and also not on hamburger, close it
      if (sidebarOpen) {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(e.target) &&
          hamburgerRef.current &&
          !hamburgerRef.current.contains(e.target)
        ) {
          setSidebarOpen(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-brand">
            <span className="brand-text">
              Day<span className="brand-highlight">Z</span> server
            </span>
            <span
              className="discord-icon"
              style={{ display: "flex", marginTop: "10px" }}
            >
              <DiscordSVG fill="#7289da" />
            </span>
          </div>
        </div>

        <div className="navbar-center">
          <ul className="nav-links">
            <li className="nav-item">About</li>
            <li className="nav-item">Updates</li>
            <li className="nav-item active">Connect</li>
          </ul>
        </div>

        <div className="navbar-right">
          <div className="player-count">{`${currentPlayers} / ${maxPlayers} players online`}</div>
          <div
            className="hamburger"
            onClick={() => setSidebarOpen(true)}
            ref={hamburgerRef}
          >
            <Hamburger fill="#fff" width="45px" height="45px" />
          </div>
        </div>
      </nav>

      <div className={`sidebar ${sidebarOpen ? "show" : ""}`} ref={sidebarRef}>
        <div className="sidebar-header">
          <Close
            fill="#ffffff"
            width="45px"
            height="45px"
            style={{ cursor: "pointer" }}
            onClick={() => setSidebarOpen(false)}
          />
        </div>
        <ul>
          <li onClick={() => setSidebarOpen(false)}>About</li>
          <li onClick={() => setSidebarOpen(false)}>Updates</li>
          <li onClick={() => setSidebarOpen(false)}>Connect</li>
          <div className="player-count-sidebar">{`${currentPlayers} / ${maxPlayers} players online`}</div>
        </ul>
      </div>
    </>
  );
}
