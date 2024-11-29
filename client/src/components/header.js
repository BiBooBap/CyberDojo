import React from "react";
import "../index.css";

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/img/CD.png" alt="CyberDojo Logo" className="logo" />
        <h1 className="title">CyberDojo</h1>
      </div>
      <nav className="nav">
        <button className="nav-link">Corsi</button>
        <button className="nav-link">Shop</button>
        <button className="nav-link">Supporto</button>
      </nav>
      <div className="user-info">
        <div className="coins">
          <img src="/img/coin.png" alt="Coins Icon" className="coins-icon" />
          <span>1</span>
        </div>
        <img
          src="/path-to-profile-icon.png"
          alt="Profile Icon"
          className="profile-icon"
        />
      </div>
    </header>
  );
}

export default Header;