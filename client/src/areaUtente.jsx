import React, { useState, useEffect } from "react";
import "./index.css";
import { isUserLoggedIn } from "./utils/auth";
import { useNavigate } from "react-router-dom";

const AreaUtente = () => {
  const [selectedSection, setSelectedSection] = useState("Gestione Account");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  // Redirect to login page if user is not logged in
  // Remove this block if you want to allow unauthenticated users to access this page
  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  const renderForm = () => {
    if (selectedSection === "Gestione Account") {
      return (
        <div className="card-body mt-6 py-4 px-6 bg-[#e0a11b] rounded-2xl font-Montserrat w-full max-w-2xl">
          <h1 className="text-[#f7d1cd] font-bold text-2xl justify-self-center mb-2">
            {selectedSection}
          </h1>
          <button
            type="button"
            className="button-CD py-2 px-8 mt-3 ml-3 text-xl bg-red-600 hover:bg-red-700"
          >
            Elimina Account
          </button>
        </div>
      );
    } else if (
      selectedSection.includes("Gestione") ||
      selectedSection.includes("Modifica")
    ) {
      return (
        <div className="card-body mt-6 py-4 px-6 bg-[#e0a11b] rounded-2xl font-Montserrat w-full max-w-2xl">
          <h1 className="text-[#f7d1cd] font-bold text-2xl justify-self-center mb-2">
            {selectedSection}
          </h1>
          <p className="mb-1 text-white font-bold text-sm">Campo 1</p>
          <input
            type="text"
            className="rounded-2xl w-full md:w-72 h-8 mb-2 pl-2 login-input"
            placeholder="Campo 1"
          />
          <p className="mb-1 text-white font-bold text-sm">Campo 2</p>
          <input
            type="text"
            className="rounded-2xl w-full md:w-72 h-8 mb-2 pl-2 login-input"
            placeholder="Campo 2"
          />
          <p className="mb-1 text-white font-bold text-sm">Campo 3</p>
          <input
            type="text"
            className="rounded-2xl w-full md:w-72 h-8 mb-2 pl-2 login-input"
            placeholder="Campo 3"
          />
          <br />
          <button
            type="submit"
            className="button-CD py-2 px-8 mt-3 ml-3 text-xl"
          >
            Invia
          </button>
        </div>
      );
    } else {
      return (
        <div className="card-body mt-6 py-4 px-6 bg-[#e0a11b] rounded-2xl font-Montserrat w-full max-w-2xl">
          <h1 className="text-[#f7d1cd] font-bold text-2xl justify-self-center mb-2">
            {selectedSection}
          </h1>
          <p className="text-white font-bold text-lg">Coming Soon</p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div
        className="bg-[#54295c] text-white w-full md:w-1/4  md:relative md:mb-0"
        style={{ marginBottom: "-2.5rem" }}
      >
        <h2 className="font-bold text-xl p-4 hidden md:block">Area Utente</h2>
        <ul className="space-y-2 md:block hidden">
          {[
            "Gestione Account",
            "Gestione Premi",
            "Sezione Premi",
            "Corsi seguiti",
            "Modifica credenziali",
            "Modifica avatar",
            "Richiedi supporto",
          ].map((section) => (
            <li key={section}>
              <button
                className={`w-full text-left px-4 py-2 rounded ${
                  selectedSection === section
                    ? "bg-[#4b2153] text-[#e0a11b]"
                    : ""
                }`}
                onClick={() => setSelectedSection(section)}
              >
                {section}
              </button>
            </li>
          ))}
        </ul>
        {/* Burger menu for mobile */}
        <div className="md:hidden">
          <button className="hamburger-menu text-white" onClick={toggleMenu}>
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
          {isMenuOpen && (
            <ul className="space-y-2 mt-4">
              <li>
                <a
                  href="/homepage"
                  className="w-full text-left px-4 py-2 rounded block hover:bg-[#4b2153]"
                >
                  Corsi
                </a>
              </li>
              <li>
                <a
                  href="/negoziopunti"
                  className="w-full text-left px-4 py-2 rounded block hover:bg-[#4b2153]"
                >
                  Negozio punti
                </a>
              </li>
              <li>
                <a
                  href="/supporto"
                  className="w-full text-left px-4 py-2 rounded block hover:bg-[#4b2153]"
                >
                  Supporto
                </a>
              </li>
              {[
                "Gestione Account",
                "Gestione Premi",
                "Sezione Premi",
                "Corsi seguiti",
                "Modifica credenziali",
                "Modifica avatar",
                "Richiedi supporto",
              ].map((section) => (
                <li key={section}>
                  <button
                    className={`w-full text-left px-4 py-2 rounded ${
                      selectedSection === section
                        ? "bg-[#4b2153] text-[#e0a11b]"
                        : ""
                    }`}
                    onClick={() => setSelectedSection(section)}
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex-1 p-6 text-[#f7d1cd] flex justify-center items-center mt-16 md:mt-0">
        {renderForm()}
      </div>
    </div>
  );
};

export default AreaUtente;
