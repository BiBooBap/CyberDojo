import React from "react";

const HomePage = () => {
  return (
    <div>
      <h1 className="font-Montserrat justify-self-center font-bold text-xl mb-3 mt-3">
        Panoramica corsi
      </h1>
      <div className="card-body p-3">
        <img src="/img/base" alt="Foto corso" className="logo w-14 h-14"></img>
        <h3 className="font-bold">Qui andrà il nome del corso</h3>
        <p className="text-xs mb-1">Livello difficoltà:difficoltà del corso</p>
        <button className="button-CD p-[7px]">buttonIscrizione</button>
      </div>
      <h1 className="font-Montserrat justify-self-center font-bold text-xl mb-3 mt-3">
        Corsi per iniziare
      </h1>
      <div className="card-body p-3 ">
        <img src="/img/base" alt="Foto corso" className="logo w-14 h-14"></img>
        <h3 className="font-bold">Qui andrà il nome del corso</h3>
        <p className="text-xs mb-1">Livello difficoltà:difficoltà del corso</p>
        <button className="button-CD p-[7px]">buttonIscrizione</button>
      </div>
      <h1 className="font-Montserrat justify-self-center font-bold text-xl mb-3 mt-3">
        Corsi per migliorare le conoscenze
      </h1>
      <div className="card-body p-3">
        <img src="/img/base" alt="Foto corso" className="logo w-14 h-14"></img>
        <h3 className="font-bold">Qui andrà il nome del corso</h3>
        <p className="text-xs mb-1">Livello difficoltà:difficoltà del corso</p>
        <button className="button-CD p-[7px]">buttonIscrizione</button>
      </div>
      <h1 className="font-Montserrat justify-self-center font-bold text-xl mb-3 mt-3">
        Corsi per consolidare le proprie abilità
      </h1>
      <div className="card-body p-3">
        <img src="/img/base" alt="Foto corso" className="logo w-14 h-14"></img>
        <h3 className="font-bold">Qui andrà il nome del corso</h3>
        <p className="text-xs mb-1">Livello difficoltà:difficoltà del corso</p>
        <button className="button-CD p-[7px]">buttonIscrizione</button>
      </div>
    </div>
  );
};

export default HomePage;
