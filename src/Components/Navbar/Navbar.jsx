import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { ReactComponent as DiscordSVG } from "../../Images/discord.svg";
import { ReactComponent as Hamburger } from "../../Images/hamburger.svg";
import { ReactComponent as Close } from "../../Images/x.svg";
import useServerData from "../../Hooks/useServerData";
import { DISCROD_INVITE_LINK } from "../../Configs/Config";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);

  const serverData = useServerData();
  const isLoading = !serverData; // Determine if data is still loading

  const [error, setError] = useState(""); // State to handle errors

  const copyToClipboard = async () => {
    if (serverData?.ipAddress && serverData?.port) {
      const copyString = `${serverData.ipAddress}:${serverData.port}`;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(copyString);
        } else {
          // Fallback method for older browsers
          const textarea = document.createElement("textarea");
          textarea.value = copyString;
          textarea.style.position = "fixed"; // Prevent scrolling to bottom
          textarea.style.left = "-9999px";
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();

          const successful = document.execCommand("copy");
          if (!successful) {
            throw new Error("Fallback: Copy command was unsuccessful");
          }

          document.body.removeChild(textarea);
        }
        setShowPopup(true);
        setError(""); // Clear any previous errors

        // Hide the popup after 5 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 5000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
        setError("Failed to copy IP address. Please try manually.");
        // Optionally, you can also hide the popup or show a different message
      }
    }
  };

  useEffect(() => {
    function handleClickOutside(e) {
      // Close sidebar if click is outside it and the hamburger
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  // Handle closing the modal when clicking outside its content
  const handleModalOutsideClick = (e) => {
    // We only close if the clicked element has the modal-overlay class
    if (e.target.classList.contains("modal-overlay")) {
      setModalOpen(false);
    }
  };

  // A small helper function to open the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // A small helper function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-brand">
            <span className="brand-text">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/about"
              >
                Raiders Refuge
              </Link>
            </span>
            <span
              className="discord-icon"
              style={{ display: "flex", marginTop: "15px" }}
            >
              <Link to={DISCROD_INVITE_LINK}>
                <DiscordSVG fill="#7289da" />
              </Link>
            </span>
          </div>
        </div>

        <div className="navbar-center">
          <ul className="nav-links">
            <li className="nav-item">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/mods"
              >
                Mods
              </Link>
            </li>
            {/* Instead of a route, we open a modal */}
            <li className="nav-item active" onClick={openModal}>
              Connect
            </li>
          </ul>
        </div>

        <div className="navbar-right">
          {/* Show spinner while data is loading */}
          <div className="player-count">
            {isLoading ? (
              <div className="loading-spinner" />
            ) : (
              `${serverData?.playerCount} / ${serverData?.maxPlayers} players online`
            )}
          </div>
          <div
            className="hamburger"
            onClick={() => setSidebarOpen(true)}
            ref={hamburgerRef}
          >
            <Hamburger fill="#fff" width="45px" height="45px" />
          </div>
        </div>
      </nav>

      {/* Sidebar for mobile view */}
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
          <li onClick={() => setSidebarOpen(false)}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/about"
            >
              About
            </Link>
          </li>
          <li onClick={() => setSidebarOpen(false)}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/mods">
              Mods
            </Link>
          </li>
          <li
            onClick={() => {
              setSidebarOpen(false);
              openModal();
            }}
          >
            Connect
          </li>
          <div className="player-count-sidebar">
            {isLoading ? (
              <div className="loading-spinner" />
            ) : (
              `${serverData?.playerCount} / ${serverData?.maxPlayers} players online`
            )}
          </div>
        </ul>
      </div>

      {/* Modal Window */}
      {modalOpen && (
        <div className="modal-overlay" onClick={handleModalOutsideClick}>
          <div className="modal-content">
            <div className="modal-header">
              <Close
                fill="#ffffff"
                width="30px"
                height="30px"
                style={{ cursor: "pointer" }}
                onClick={closeModal}
              />
            </div>
            <div className="modal-body">
              <h2 className="modal-titel">Server Connection Info</h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p style={{ fontSize: "1.45rem" }}>
                  IP Address: {serverData?.ipAddress}:{serverData?.port}
                </p>
                <button
                  className="copy-to-clipboard"
                  onClick={copyToClipboard}
                ></button>
              </div>
              {error && <div className="error-popup">{error}</div>}
              {/* Discord Button */}
              <Link to={DISCROD_INVITE_LINK} style={{ textDecoration: "none" }}>
                <button className="footer-discord">
                  <DiscordSVG fill="#fff" width="24px" height="24px" />
                  <span style={{ marginLeft: "8px" }}>Join our Discord</span>
                </button>
              </Link>
              {showPopup && (
                <div className="popup">IP address copied to clipboard!</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
