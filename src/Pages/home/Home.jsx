import React, { useState, useEffect } from "react";
import "./Home.css";
import ArrowImage from "../../Images/ArrowRightShort.png";
import { Link } from "react-router-dom";
import ReactHelmet from "../../Components/ReactHelmet";

export default function Home() {
  // Track the background position (X and Y)
  const [bgPosition, setBgPosition] = useState("center center");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to determine if the device is mobile
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      // Regular expression to match mobile devices
      const mobileRegex = /android|iphone|ipad|iPod|blackberry|windows phone/i;
      return mobileRegex.test(userAgent);
    };

    // Initial check
    setIsMobile(checkIsMobile());

    // Optional: Add a resize listener to handle dynamic changes
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener("resize", handleResize);

    // Cleanup resize listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // If it's mobile, do not add the mousemove listener
    if (isMobile) return;

    function handleMouseMove(e) {
      // Get the window (viewport) dimensions
      const { innerWidth, innerHeight } = window;

      // Calculate the X and Y ratios in the range of [-5, 5] (tweak as needed)
      // This means the mouse in the very left/top => -5% offset
      // and in the very right/bottom => +5% offset
      const offsetX = (e.pageX / innerWidth - 0.5) * 10;
      const offsetY = (e.pageY / innerHeight - 0.5) * 5;

      // Set the background position in percentage
      // 50% is the default center; add the offset to shift left/right, up/down
      setBgPosition(`${50 + offsetX}% ${50 + offsetY}%`);
    }

    // Attach the event listener on the entire window
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup the event when component unmounts or if isMobile changes
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  return (
    <>
      <ReactHelmet
        title="Raiders Refuge | PvP DayZ Server"
        description="Join Raiders Refuge, a premier DayZ PvP server offering an immersive survival experience with custom mods, active events, and a vibrant gaming community. Engage in intense player-versus-player combat, explore unique environments, and collaborate with fellow survivors. Perfect for both seasoned players and newcomers seeking a dynamic and challenging DayZ adventure."
        keywords="DayZ PvP server, DayZ Raiders Refuge, DayZ private server, DayZ custom server, DayZ multiplayer server, DayZ gaming community, DayZ survival server, DayZ modded server, DayZ server hosting, DayZ server rules, DayZ server events, DayZ server mods, DayZ server setup, DayZ server customization, DayZ server administration, DayZ server guides, DayZ server tutorials, DayZ server updates, DayZ server community, DayZ server forums, Best DayZ PvP servers 2025, How to join Raiders Refuge DayZ server, Top DayZ private servers for PvP, Custom DayZ servers with active communities, DayZ servers with unique mods, DayZ survival servers with high player count, DayZ modded servers with custom maps, DayZ server hosting with low latency, DayZ server rules and guidelines, DayZ server events and competitions"
      />
      <div className="home">
        {/* Hero Section */}
        <section
          className="hero"
          // Override the background-position from CSS with our dynamic value
          style={{
            backgroundPosition: bgPosition,
          }}
        >
          <div className="hero-content">
            <h1>Lorem ipsum nevim něco</h1>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          {/* Toxic Zones Card */}
          <div className="feature-card toxic-zones">
            <div className="overlay"></div>
            <div className="text">Static Toxic Zones</div>
          </div>

          {/* Loot Card */}
          <div className="feature-card loot">
            <div className="overlay"></div>
            <div className="text">Weapons ++</div>
          </div>

          {/* Helicopters Card */}
          <div className="feature-card helicopters">
            <div className="overlay"></div>
            <div className="text">Helicopters</div>
          </div>
        </section>

        {/* Show All Mods Button */}
        <button
          className="all-mods"
          style={{ background: "none", border: "none" }}
        >
          <span className="allMods-btn">
            <Link style={{ textDecoration: "none", color: "white" }} to="/mods">
              Show all mods
            </Link>
            <img src={ArrowImage} alt="Arrow" className="arrow-right" />
          </span>
        </button>

        {/* Events Section */}
        <div className="events-wrapper">
          <h3 className="events-title">Join our special events</h3>
          <div className="events">
            <div className="event-card koth">
              <div className="event-overlay"></div>
              <div className="text">King Of The Hill</div>
            </div>
            <div className="event-card keyCards">
              <div className="event-overlay"></div>
              <div className="text">Special Loot</div>
            </div>
          </div>
        </div>

        {/* KeyCard Progression System Section */}
        <div className="keycard-system">
          <div className="keycard-background-wrapper keycard-background">
            <h1 className="keycard-title">KeyCard Progression System</h1>
          </div>
          <p className="keycard-description">
            Yellow and higher tier cards have small drop chance of dropping
            higher tier cards with better{" "}
            <span className="rewards">REWARDS!</span>
          </p>
        </div>
      </div>
    </>
  );
}
