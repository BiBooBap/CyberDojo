import React from "react";
import "./App.css";

function App() {
  return (
    <header className="bg-[#54295c] text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img
          src="/path-to-logo.png"
          alt="CyberDojo Logo"
          className="w-10 h-10"
        />
        <h1 className="text-xl font-semibold">CyberDojo</h1>
      </div>
      <nav className="flex space-x-6">
        <a href="#" className="hover:text-gray-300">
          Corsi
        </a>
        <a href="#" className="hover:text-gray-300">
          Shop
        </a>
        <a href="#" className="hover:text-gray-300">
          Supporto
        </a>
      </nav>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img
            src="/path-to-coins-icon.png"
            alt="Coins Icon"
            className="w-5 h-5"
          />
          <span>1</span>
        </div>
        <img
          src="/path-to-profile-icon.png"
          alt="Profile Icon"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
}

export default App;
