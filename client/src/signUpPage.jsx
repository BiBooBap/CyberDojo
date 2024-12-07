import React, { useState } from "react";
import registrationService from "./services/registrationService";

const SignUpPage = () => {
  // Gestione dello stato
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPlaceholder, setAcceptPlaceholder] = useState(false);

  // Gestisci il submit del form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validazione input
    if (!acceptTerms || !acceptPlaceholder) {
      alert("Devi accettare i termini di utilizzo e le politiche di privacy.");
      return;
    }

    try {
      // Utilizza il servizio di registrazione
      const response = await registrationService.register({
        username,
        email,
        password,
      });

      if (response.message === "Registrazione avvenuta con successo") {
        alert("Registrazione avvenuta con successo!");
        // Reindirizza l'utente o esegui altre azioni
      } else {
        alert(`Errore durante la registrazione: ${response.message}`);
      }
    } catch (error) {
      console.error("Errore:", error);
      alert("Si è verificato un errore durante la registrazione.");
    }
  };

  return (
    <form className="card-body mt-6 py-4 px-6" onSubmit={handleSubmit}>
      <h1 className="text-[#f7d1cd] font-bold text-2xl justify-self-center mb-2">
        Registrazione
      </h1>
      <p className="mb-1 text-white font-bold text-sm">Username</p>
      <input
        className="rounded-2xl w-72 h-8 mb-2 pl-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p className="mb-1 text-white font-bold text-sm">Email</p>
      <input
        type="email"
        className="rounded-2xl w-72 h-8 mb-2 pl-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className="mb-1 text-white font-bold text-sm">Password</p>
      <input
        type="password"
        className="rounded-2xl w-72 h-8 mb-4 pl-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        type="checkbox"
        name="privacy"
        checked={acceptTerms}
        onChange={(e) => setAcceptTerms(e.target.checked)}
      />
      <label htmlFor="privacy" className="overflow-ellipsis">
        Accetto le informazioni d’uso,<br /> la politica di privacy <br /> e
        dei cookie di CyberDojo
      </label>
      <br />
      <input
        type="checkbox"
        name="placeholder"
        checked={acceptPlaceholder}
        onChange={(e) => setAcceptPlaceholder(e.target.checked)}
      />
      <label htmlFor="placeholder" className="overflow-ellipsis">
        Questo è un placeholder
      </label>
      <br />
      <button type="submit" className="button-CD py-2 px-8 mt-3 ml-3 text-xl">
        Registrati
      </button>
      <button>
        <img alt="Richiesta supporto" className="ml-4 w-20 h-20" />
      </button>
    </form>
  );
};

export default SignUpPage;