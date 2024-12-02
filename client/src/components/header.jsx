import React, { useState } from "react";
import "../index.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header bg-[#54295c] text-white p-4 flex justify-between items-center">
      <div className="logo-container flex items-center space-x-3">
        <img
          src="/img/CD.png"
          alt="CyberDojo Logo"
          className="logo w-20 h-20"
        />
        <h1 className="title text-xl font-semibold hidden md:block">
          CyberDojo
        </h1>
      </div>
      <div className="menu-container flex-1 flex justify-center md:justify-center">
        <nav
          className={`nav flex-col md:flex-row md:flex  ${
            isMenuOpen ? "flex" : "hidden"
          } md:flex justify-center items-center`}
        >
          <button className="nav-link hover:bg-[#4b2153] rounded text-center mx-6">
            Corsi
          </button>
          <button className="nav-link hover:bg-[#4b2153] rounded text-center mx-6">
            Shop
          </button>
          <button className="nav-link hover:bg-[#4b2153] rounded text-center mx-6">
            Supporto
          </button>
          <div className="user-info md:hidden items-center space-x-2 mt-4">
            <img
              src="/img/coin.png"
              alt="Coins Icon"
              className="coins-icon w-5 h-5 rounded-full"
            />
            <span>1</span>
            <button className="nav-link hover:bg-[#4b2153] rounded text-center mx-6">
              Area utente
            </button>
          </div>
        </nav>
      </div>
      <div className="user-container flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img
              src="/img/coin.png"
              alt="Coins Icon"
              className="coins-icon w-5 h-5 rounded-full"
            />
            <span>1</span>
          </div>
          <img
            src="/path-to-profile-icon.png"
            alt="Profile Icon"
            className="profile-icon w-8 h-8 rounded-full"
          />
        </div>
        <button
          className="hamburger-menu text-white md:hidden"
          onClick={toggleMenu}
        >
          {/* Icona Hamburger */}
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
