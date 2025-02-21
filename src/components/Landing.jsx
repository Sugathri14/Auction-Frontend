import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Ensuring styles are applied

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-overlay">
        <h1 className="landing-title">Welcome to Online Auction</h1>
        <p className="landing-subtitle">
          Buy and sell unique items in real-time bidding.
        </p>
        <Link to="/dashboard">
          <button className="landing-button">Explore Auctions</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
