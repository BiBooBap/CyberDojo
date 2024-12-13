import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangeCredentialsFacade from "../services/changecredentialsFacade";
import ProgressFacade from "../services/progressFacade";
import RewardItem from "../utils/RewardItem";
import ShopFacade from "../services/shopFacade";
import courseFacade from "../services/courseFacade";
import "../index.css";

const AreaUtente = () => {
  const [selectedSection, setSelectedSection] = useState("Gestione Account");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Additional states for password verification
  const [currentPassword, setCurrentPassword] = useState("");
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  // States for credentials modification
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  // States for avatar modification
  const [avatarUrl, setAvatarUrl] = useState("");

  // States for prize management
  const [nomePremio, setNomePremio] = useState("");
  const [descrizionePremio, setDescrizionePremio] = useState("");

  // States for rewards
  const [rewards, setRewards] = useState([]);
  const [error, setError] = useState(null);

  // State for user courses
  const [userCourses, setUserCourses] = useState([]);

  // State for inventory
  const [inventory, setInventory] = useState({ avatar: [], border: [], title: [] });

  // State for user profile
  const [userProfile, setUserProfile] = useState({ avatar: "", border: "", user_title: "" });

  // Function to verify the password
  const handleVerifyPassword = async (e) => {
    e.preventDefault();
    try {
      await ChangeCredentialsFacade.verifyPassword(currentPassword);
      setIsPasswordVerified(true);
      setVerificationError("");
      fetchUserInfo();
    } catch (error) {
      setVerificationError("Password errata. Riprova.");
    }
  };



  // Function to fetch user information
  const fetchUserInfo = async () => {
    try {
      const userInfo = await ChangeCredentialsFacade.getUserInfo();
      setNewUsername(userInfo.username);
      setNewEmail(userInfo.email);
      setUserProfile({
        avatar: userInfo.avatar,
        border: userInfo.border,
        user_title: userInfo.user_title,
      });
    } catch (error) {
      console.error("Errore durante il recupero delle informazioni utente:", error);
      alert("Errore nel recupero delle informazioni utente.");
    }
  };
      // Log userProfile values
      useEffect(() => {
        console.log("Border:", userProfile.border);
        console.log("Avatar:", userProfile.avatar);
        console.log("User Title:", userProfile.user_title);
      }, [userProfile]);

  // Function to check if the user is authenticated
  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  // Redirect to the login page if the user is not authenticated
  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate("/accessPage");
    }
  }, [navigate]);

  //Loading user information
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Fetch rewards when "Sezione Premi" is selected
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const data = await ProgressFacade.getProgress();
        console.log("Dati recuperati:", data);
        setRewards(data);
      } catch (error) {
        console.error("Errore nel recupero dei premi:", error);
        setError(error.message);
      }
    };

    if (selectedSection === "Sezione Premi") {
      fetchRewards();
    }
  }, [selectedSection]);

  // Fetch invetory when "Inventario" is selected
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const userInventory = await ShopFacade.getUserInventory();
        const organizedInventory = { avatar: [], border: [], title: [] };
        userInventory.items.forEach(item => {
          if (item.type === "avatar") organizedInventory.avatar.push(item);
          else if (item.type === "border") organizedInventory.border.push(item);
          else if (item.type === "title") organizedInventory.title.push(item);
        });
        setInventory(organizedInventory);
      } catch (error) {
        console.error("Errore nel recupero dell'inventario:", error);
      }
    };

    if (selectedSection === "Inventario") {
      fetchInventory();
    }
  }, [selectedSection]);

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const courses = await courseFacade.getEnrolledCourses();
        setUserCourses(courses);
      } catch (error) {
        console.error("Errore nel recupero dei corsi seguiti:", error);
      }
    };

    if (selectedSection === "Corsi seguiti") {
      fetchUserCourses();
    }
  }, [selectedSection]);

  // Definition of the toggleMenu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to validate the credentials modification form
  const validateForm = () => {
    const newErrors = {};

    // RegEx for email
    const emailRegex = /^[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9.-]{1,253}\.[A-Za-z]{2,10}$/;
    if (!emailRegex.test(newEmail)) {
      newErrors.email = "Email non valida.";
    }

    // Username validation
    if (newUsername.length > 20) {
      newErrors.username = "L'username deve essere lungo al massimo 20 caratteri.";
    }

    // RegEx for password (only if it is being changed)
    if (newPassword) {
      const passwordRegex = /^(?=.*[A-ZÀ-Ù])(?=.*[a-zà-ù])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/;
      if (newPassword.length < 8) {
        newErrors.password = "La password deve avere almeno 8 caratteri.";
      } else if (!passwordRegex.test(newPassword)) {
        newErrors.password = "La password non rispetta i requisiti di sicurezza.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle credentials update
  const handleUpdateCredentials = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await ChangeCredentialsFacade.updateUserCredentials({
        newUsername,
        newEmail,
        newPassword,
      });
      alert("Credenziali aggiornate con successo!");
      setNewPassword("");
      setErrors({});
    } catch (error) {
      console.error("Errore durante l'aggiornamento delle credenziali:", error);
      alert("Errore durante l'aggiornamento delle credenziali.");
    }
  };

  // Function to handle avatar update
  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    try {
      await ChangeCredentialsFacade.updateAvatar(avatarUrl);
      alert("Avatar aggiornato con successo!");
    } catch (error) {
      console.error("Errore durante l'aggiornamento dell'avatar:", error);
      alert("Errore durante l'aggiornamento dell'avatar.");
    }
  };

  // Function to handle adding a prize
  const handlePremiSubmit = async (e) => {
    e.preventDefault();
    try {
      await ChangeCredentialsFacade.addPremio({
        nomePremio,
        descrizionePremio,
      });
      alert("Premio aggiunto con successo!");
      setNomePremio("");
      setDescrizionePremio("");
    } catch (error) {
      console.error("Errore durante l'aggiunta del premio:", error);
      alert("Errore durante l'aggiunta del premio.");
    }
  };

  // Function to handle account deletion
  const handleDeleteAccount = async () => {
    if (window.confirm("Sei sicuro di voler eliminare il tuo account? Questa azione è irreversibile.")) {
      try {
        const response = await ChangeCredentialsFacade.deleteAccount();

        alert("Account eliminato con successo.");
        // Remove the token and redirect the user
        localStorage.removeItem("token");
        navigate("/signupPage");

      } catch (error) {
        console.error("Errore durante l'eliminazione dell'account:", error);
        alert("Errore durante l'eliminazione dell'account.");
      }
    } else {
      return;
    }
  };

  const handleSelectItem = async (type, imagePath) => {
    try {
      await ShopFacade.updateUserProfile(type, imagePath );
      fetchUserInfo();
      alert("Profilo aggiornato con successo!");
    } catch (error) {
      console.error("Errore durante l'aggiornamento del profilo:", error);
      alert("Errore durante l'aggiornamento del profilo.");
    }
  };

  const renderForm = () => {
    if (selectedSection === "Inventario") {
      return (
        <div className="card-body mt-6 py-4 px-6 bg-[#e0a11b] rounded-2xl font-Montserrat w-full max-w-2xl">
          <h1 className="text-[#f7d1cd] font-bold text-2xl justify-self-center mb-2">
            {selectedSection}
          </h1>
          <div className="inventory-section">
            <h2 className="text-white font-bold text-xl mb-2">Avatars</h2>
            {inventory.avatar.length > 0 ? (
              inventory.avatar.map((item, index) => (
                <div key={index} className="inventory-item flex flex-col items-center mb-4">
                  <img src={item.image_path} alt={item.name} className="w-24 h-24 object-cover mb-2" />
                  <p className="font-bold mb-1">{item.name}</p>
                  <p className="text-sm mb-2 text-center">{item.description}</p>
                  <button
                    className="bg-[#e0a11b] text-white py-1 px-4 rounded cursor-pointer hover:bg-[#d18f1a]"
                    onClick={() => handleSelectItem('avatar', item.image_path)}
                  >
                    Seleziona
                  </button>
                </div>
              ))
            ) : (
              <p className="text-white">Nessun avatar disponibile</p>
            )}
          </div>
          <div className="inventory-section">
            <h2 className="text-white font-bold text-xl mb-2">Bordi</h2>
            {inventory.border.length > 0 ? (
              inventory.border.map((item, index) => (
                <div key={index} className="inventory-item flex flex-col items-center mb-4">
                  <img src={item.image_path} alt={item.name} className="w-24 h-24 object-cover mb-2" />
                  <p className="font-bold mb-1">{item.name}</p>
                  <p className="text-sm mb-2 text-center">{item.description}</p>
                  <button
                    className="bg-[#e0a11b] text-white py-1 px-4 rounded cursor-pointer hover:bg-[#d18f1a]"
                    onClick={() => handleSelectItem('border', item.image_path)}
                  >
                    Seleziona
                  </button>
                </div>
              ))
            ) : (
              <p className="text-white">Nessun bordo disponibile</p>
            )}
          </div>
          <div className="inventory-section">
            <h2 className="text-white font-bold text-xl mb-2">Titoli</h2>
            {inventory.title.length > 0 ? (
              inventory.title.map((item, index) => (
                <div key={index} className="inventory-item flex flex-col items-center mb-4">
                  <img src={item.image_path} alt={item.name} className="w-24 h-24 object-cover mb-2" />
                  <p className="font-bold mb-1">{item.name}</p>
                  <p className="text-sm mb-2 text-center">{item.description}</p>
                  <button
                    className="bg-[#e0a11b] text-white py-1 px-4 rounded cursor-pointer hover:bg-[#d18f1a]"
                    onClick={() => handleSelectItem('user_title', item.image_path)}
                  >
                    Seleziona
                  </button>
                </div>
              ))
            ) : (
              <p className="text-white">Nessun titolo disponibile</p>
            )}
          </div>
        </div>
      );
    }
    if (selectedSection === "Gestione Account") {
      return (
        <div className="flex flex-col justify-between space-y-8">
          <div className="card-body py-4 px-6 bg-[#e0a11b] rounded-2xl font-Montserrat w-full max-w-2xl">
            <h2 className="text-[#f7d1cd] font-bold text-xl mb-2">Avatar Profilo</h2>
            <div className="flex items-center space-x-4">
              <div className="relative w-32 h-32 mb-3">
                <img
                  src={userProfile.border}
                  alt="Bordo"
                  className="w-32 h-32 object-cover rounded-full absolute top-0 left-0"
                />
                <img
                  src={userProfile.avatar}
                  alt="Avatar"
                  className="w-32 h-32 object-cover rounded-full absolute top-0 left-0"
                />
                <img src={userProfile.user_title} alt="Titolo" className="w-16 h-16 object-cover rounded-full" />
              </div>
              <div className="flex flex-col space-y-2">
                <div>
                  <p className="text-white font-bold">Username:</p>
                  <p className="text-white">{newUsername}</p>
                </div>
                <div>
                  <p className="text-white font-bold">Email:</p>
                  <p className="text-white">{newEmail}</p>
                </div>
                <div>
                  <p className="text-white font-bold">Password:</p>
                  <p className="text-white">••••••••</p>
                </div>
              </div>
            </div>
          </div>
          {!isPasswordVerified ? (
            <div className="card-body mt-6 py-4 px-6 bg-[#e0a11b] rounded-2xl font-Montserrat w-full max-w-2xl">
              <h1 className="text-[#f7d1cd] font-bold text-2xl justify-self-center mb-2">
                Modifica credenziali
              </h1>
              <form className="flex flex-col items-center" onSubmit={handleVerifyPassword}>
                <p className="mb-1 text-white font-bold text-sm">Inserisci la tua password attuale</p>
                <input
                  type="password"
                  placeholder="Password attuale"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mb-3 px-4 py-2 rounded"
                  required
                />
                {verificationError && (
                  <span className="text-black text-sm mb-2">{verificationError}</span>
                )}
                <button type="submit" className="button-CD py-2 px-8 text-xl">
                  Verifica
                </button>
              </form>
            </div>
          ) : (
            <div className="card-body mt-6 py-4 px-6 bg-[#e0a11b] rounded-2xl font-Montserrat w-full max-w-2xl">
              <h1 className="text-[#f7d1cd] font-bold text-2xl justify-self-center mb-2">
                Modifica Credenziali
              </h1>
              <form className="flex flex-col items-center" onSubmit={handleUpdateCredentials}>
                <input
                  type="text"
                  placeholder="Nuovo Username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="mb-3 px-4 py-2 rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Nuova Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="mb-3 px-4 py-2 rounded"
                  required
                />
                <input
                  type="password"
                  placeholder="Nuova Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mb-3 px-4 py-2 rounded"
                  required
                />
                {Object.values(errors).map((error, index) => (
                  <p key={index} className="text-red-500 text-sm mb-2">
                    {error}
                  </p>
                ))}
                <button type="submit" className="button-CD py-2 px-8 text-xl">
                  Aggiorna Credenziali
                </button>

                <button
                  type="button"
                  className="delete-account-button mt-4 py-2 px-8 text-xl bg-red-600 hover:bg-red-700 rounded"
                  onClick={handleDeleteAccount}
                >
                  Elimina Account
                </button>
              </form>
            </div>
          )}
        </div>
      );
    } else if (selectedSection === "Sezione Premi") {
      return (
        <div className="card-body mt-6 py-4 px-6 bg-[#e0a11b] rounded-2xl font-Montserrat w-full max-w-2xl">
          <h1 className="text-[#f7d1cd] font-bold text-2xl justify-self-center mb-2">
            Sezione Premi
          </h1>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            rewards.map((reward) => <RewardItem key={reward._id} reward={reward} />)
          )}
        </div>
      );
    }

    if (selectedSection === "Corsi seguiti") {
      return (
        <div className="card-body mt-6 py-4 px-6 bg-[#e0a11b] rounded-2xl font-Montserrat w-full max-w-2xl">
          <h1 className="text-[#f7d1cd] font-bold text-2xl justify-self-center mb-2">
            Corsi Seguiti
          </h1>
          {userCourses.length > 0 ? (
            userCourses.map((course, index) => {
              return (
                <div key={course.id || course._id || `course-${index}`} className="mb-4">
                  <h2 className="text-white font-bold text-xl">Titolo: {course.title}</h2>
                  <p className="text-white">Progresso: {course.progress}%</p>
                </div>
              );
            })
          ) : (
            <p className="text-white">Non sei iscritto a nessun corso.</p>
          )}
        </div>
      );
    }

    return (
      <div className="card-body mt-6 py-4 px-6 bg-[#e0a11b] rounded-2xl font-Montserrat w-full max-w-2xl">
        <h1 className="text-[#f7d1cd] font-bold text-2xl justify-self-center mb-2">
          {selectedSection}
        </h1>
        <p className="text-white font-bold text-lg">Coming Soon</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="bg-[#54295c] text-white w-full md:w-1/4 md:relative md:mb-0" style={{ marginBottom: "-2.5rem" }}>
        <h2 className="font-bold text-xl p-4 hidden md:block">Area Utente</h2>
        <ul className="space-y-2 md:block hidden">
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                selectedSection === "Gestione Account" ? "bg-[#4b2153] text-[#e0a11b]" : ""
              }`}
              onClick={() => setSelectedSection("Gestione Account")}
            >
              Gestione Account
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                selectedSection === "Inventario" ? "bg-[#4b2153] text-[#e0a11b]" : ""
              }`}
              onClick={() => setSelectedSection("Inventario")}
            >
              Inventario
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                selectedSection === "Sezione Premi" ? "bg-[#4b2153] text-[#e0a11b]" : ""
              }`}
              onClick={() => setSelectedSection("Sezione Premi")}
            >
              Sezione Premi
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                selectedSection === "Corsi seguiti" ? "bg-[#4b2153] text-[#e0a11b]" : ""
              }`}
              onClick={() => setSelectedSection("Corsi seguiti")}
            >
              Corsi seguiti
            </button>
          </li>
        </ul>
        {/* Burger menu for mobile */}
        <div className="md:hidden">
          <button className="hamburger-menu text-white" onClick={toggleMenu}>
            {/* Icon Hamburger */}
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
              />
            </svg>
          </button>
          {isMenuOpen && (
            <ul className="space-y-2 mt-4">
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded ${
                    selectedSection === "Gestione Account"
                      ? "bg-[#4b2153] text-[#e0a11b]"
                      : ""
                  }`}
                  onClick={() => setSelectedSection("Gestione Account")}
                >
                  Gestione Account
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded ${
                    selectedSection === "Inventario"
                      ? "bg-[#4b2153] text-[#e0a11b]"
                      : ""
                  }`}
                  onClick={() => setSelectedSection("Inventario")}
                >
                  Inventario
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded ${
                    selectedSection === "Sezione Premi"
                      ? "bg-[#4b2153] text-[#e0a11b]"
                      : ""
                  }`}
                  onClick={() => setSelectedSection("Sezione Premi")}
                >
                  Sezione Premi
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded ${
                    selectedSection === "Corsi seguiti"
                      ? "bg-[#4b2153] text-[#e0a11b]"
                      : ""
                  }`}
                  onClick={() => setSelectedSection("Corsi seguiti")}
                >
                  Corsi seguiti
                </button>
              </li>
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