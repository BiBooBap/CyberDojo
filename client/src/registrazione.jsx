import React from "react";

const Registrazione = () => {
  return (
    <div className="justify-self-center mt-6 py-4 px-6 bg-[#e0a11b] rounded-2xl font-Montserrat">
      <h1 className="text-[#f7d1cd] font-bold text-2xl justify-self-center mb-2">
        Registrazione
      </h1>
      <p className="mb-1 text-white font-bold text-sm">Username</p>
      <input className="rounded-2xl w-72 h-8 mb-2 pl-2"></input>
      <p className="mb-1 text-white font-bold text-sm">Email</p>
      <input className="rounded-2xl w-72 h-8 mb-2 pl-2"></input>
      <p className="mb-1 text-white font-bold text-sm">Password</p>
      <input className="rounded-2xl w-72 h-8 mb-4 pl-2"></input>
      <br></br>
      <input type="checkbox" name="privacy" value="privacy"></input>
      <label for="privacy" className="overflow-ellipsis">
        Accetto le informazioni d’uso,<br></br> la politica di privacy <br></br>
        e dei cookie di CyberDojo
      </label>
      <br></br>
      <input type="checkbox" name="privacy" value="privacy"></input>
      <label for="privacy" className="overflow-ellipsis">
        Questo è un placeholder
      </label>
      <br></br>
      <button className="bg-[#54295c] hover:bg-[#4b2153] text-white rounded-3xl py-2 px-8 mt-3 ml-3 font-bold text-xl">
        Registrati
      </button>
      <button>
        <img alt="Richiesta supporto" className="ml-4 w-20 h-20" />
      </button>
    </div>
  );
};

export default Registrazione;
