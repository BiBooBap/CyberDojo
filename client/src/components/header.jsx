import React, { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { isUserLoggedIn, getUserRole, getToken } from "../utils/auth"; // [`isUserLoggedIn`](client/src/utils/auth.js), [`getUserRole`](client/src/utils/auth.js), [`getToken`](client/src/utils/auth.js)
import UserFacade from "../services/userFacade"; // [`UserFacade`](client/src/services/userFacade.js)

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const isLoggedIn = isUserLoggedIn();
  const userRole = getUserRole();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/homepage";
  };

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const userPoints = await UserFacade.fetchUserPoints();
        setPoints(userPoints);
      } catch (error) {
        console.error("Errore nel recupero dei punti:", error);
      }
    };

    if (isLoggedIn) {
      fetchPoints();
    }
  }, [isLoggedIn]);

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
          className={`nav flex-col md:flex-row md:flex ${
            isMenuOpen ? "flex" : "hidden"
          } md:flex justify-center items-center`}
        >
          {isLoggedIn ? (
            // **Utente loggato**
            <>
              {userRole === "user" && (
                <>
                  <button className="nav-link hover:bg-[#4b2153] px-4 py-2 rounded text-center mx-2 font-bold text-lg">
                    <Link to="/homepage">Corsi</Link>
                  </button>
                  <button className="nav-link hover:bg-[#4b2153] px-4 py-2 rounded text-center mx-2 font-bold text-lg">
                    <Link to="/negoziopunti">Negozio punti</Link>
                  </button>
                  <button className="nav-link hover:bg-[#4b2153] px-4 py-2 rounded text-center mx-2 font-bold text-lg">
                    <Link to="/supportrequestpage">Supporto</Link>
                  </button>
                  {/* Sezione Punti Utente */}
                  <div className="flex items-center space-x-2 mx-2">
                    <img
                      src="/img/coin.png"
                      alt="Coins Icon"
                      className="coins-icon w-5 h-5 rounded-full"
                    />
                    <span>{points}</span> {/* Punti Dinamici */}
                  </div>
                  {/* Icona Area Utente */}
                  <Link to="/areaUtente">
                    <img
                      src="/img/default.png" // Assicurati di avere questa icona nella cartella img
                      alt="Area Utente"
                      className="user-icon w-6 h-6 rounded-full mx-2"
                    />
                  </Link>
                </>
              )}
                {userRole === "admin" && (
                <>
                  <button className="nav-link hover:bg-[#4b2153] px-4 py-2 rounded text-center mx-2 font-bold text-lg">
                    <Link to="/admin/adminTicketDashboard">Dashboard</Link>
                  </button>
                  {/* Aggiungi altre voci per l'admin se necessario */}
                </>
              )}
              {/* Pulsante Logout */}
              <button
                onClick={handleLogout}
                className="nav-link hover:bg-[#4b2153] px-4 py-2 rounded text-center mx-2 font-bold text-lg"
              >
                Logout
              </button>
            </>
          ) : (
            // **Utente non loggato**
            <>
              <button className="nav-link hover:bg-[#4b2153] px-4 py-2 rounded text-center mx-2 font-bold text-lg">
                <Link to="/homepage">Homepage</Link>
              </button>
              <button className="nav-link hover:bg-[#4b2153] px-4 py-2 rounded text-center mx-2 font-bold text-lg">
                <Link to="/accessPage">Accedi o Registrati</Link>
              </button>
              {/* Pulsante Supporto */}
              <button className="nav-link hover:bg-[#4b2153] px-4 py-2 rounded text-center mx-2 font-bold text-lg">
                <Link to="/supporto">Supporto</Link>
              </button>
            </>
          )}
        </nav>
      </div>
      <div className="user-container flex items-center space-x-4">
        <button
          className="menu-toggle md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {/* Icona menu per dispositivi mobili */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;