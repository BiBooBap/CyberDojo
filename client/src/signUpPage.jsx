import React, { useState } from "react";
import RegistrationFacade from "./services/registrationFacade";

// SignUpPage component
const SignUpPage = () => {
  // State variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPlaceholder, setAcceptPlaceholder] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation function
  function validateForm() {
    const newErrors = {};

    // RegEx for email
    const emailRegex =
      /^[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9.-]{1,253}\.[A-Za-z]{2,10}$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Email non valida.";
    }

    // Username validation
    if (username.length > 20) {
      newErrors.username =
        "L'username deve essere lungo al massimo 20 caratteri.";
    }

    // RegEx for password
    const passwordRegex =
      /^(?=.*[A-ZÀ-Ù])(?=.*[a-zà-ù])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/;
    if (password.length < 8) {
      newErrors.password = "La password deve avere almeno 8 caratteri.";
    } else if (!passwordRegex.test(password)) {
      newErrors.password = "La password non rispetta i requisiti di sicurezza.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Update handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptTerms) {
      alert("Devi accettare i termini di utilizzo e le politiche di privacy.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const response = await RegistrationFacade.registerUser({
        username,
        email,
        password,
      });

      if (response.message === "Registrazione avvenuta con successo") {
        alert("Registrazione avvenuta con successo!");
        // Redirect the user or perform other actions
      } else {
        alert(`Errore durante la registrazione: ${response.message}`);
      }
    } catch (error) {
      console.error("Errore:", error);
      alert("Si è verificato un errore durante la registrazione.");
    }
  };

  // Return the JSX element
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card-body py-8 px-6 bg-white rounded shadow-md">
        <h1 className="text-[#f7d1cd] font-bold text-2xl justify-self-center mb-2">
          Registrazione
        </h1>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          {/* Username */}
          <p className="mb-1 text-white font-bold text-sm">Username</p>
          <div className="mb-2">
            <input
              className={`rounded-2xl w-72 h-8 pl-2 ${
                errors.username ? "border-red-500 border-2" : ""
              }`}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <span className="text-black text-sm mt-1 block">
                {errors.username}
              </span>
            )}
          </div>

          {/* Email */}
          <p className="mb-1 text-white font-bold text-sm">Email</p>
          <div className="mb-4">
            <input
              type="email"
              className={`rounded-2xl w-72 h-8 pl-2 ${
                errors.email ? "border-red-500 border-2" : ""
              }`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="text-black text-sm mt-1 block">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <p className="mb-1 text-white font-bold text-sm">Password</p>
          <div className="mb-4">
            <input
              type="password"
              className={`rounded-2xl w-72 h-8 pl-2 ${
                errors.password ? "border-red-500 border-2" : ""
              }`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="text-black text-sm mt-1 block">
                {errors.password}
              </span>
            )}
          </div>

          {/* Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="privacy"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <label htmlFor="privacy" className="overflow-ellipsis ml-2">
              Accetto le informazioni d’uso,
              <br /> la politica di privacy <br /> e dei cookie di CyberDojo
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center">
            <br />
            <button type="submit" className="button-CD py-2 px-8 mt-3 text-xl">
              Registrati
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
