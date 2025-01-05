import React, { useState } from "react";
import "./Footer.css";
import useServerData from "../Hooks/useServerData";
import { DISCROD_INVITE_LINK } from "../Configs/Config";
import { Link } from "react-router-dom";
import { ReactComponent as DiscordSVG } from "../Images/discord.svg";

export default function Footer() {
  const serverData = useServerData();

  const [showPopup, setShowPopup] = useState(false);
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

  return (
    <footer className="footer">
      <div className="footer-content">
        <h1 className="footer-title" style={{ fontWeight: "500" }}>
          Don't miss out and join our Discord to learn more{" "}
        </h1>
        <div className="linksWrapper">
          <Link to={DISCROD_INVITE_LINK} style={{ textDecoration: "none" }}>
            <button
              className="footer-discord"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div style={{ marginTop: "7px" }}>
                <DiscordSVG fill="#fff" width="24px" height="24px" />
              </div>

              <span style={{ marginLeft: "8px" }}>Join our Discord</span>
            </button>
          </Link>

          <div className="ip-wrapper">
            {serverData?.ipAddress ? (
              <span className="IPadress">
                Server IP: {serverData.ipAddress}:{serverData.port}
              </span>
            ) : (
              <div className="loading-spinner" />
            )}
            <button
              className="copy-to-clipboard"
              onClick={copyToClipboard}
              aria-label="Copy Server IP"
              title="Copy Server IP"
            ></button>
          </div>
        </div>
        {/* Popup Message */}
        {showPopup && (
          <div className="popup">IP address copied to clipboard!</div>
        )}
        {/* Error Message */}
        {error && <div className="error-popup">{error}</div>}
      </div>
    </footer>
  );
}
