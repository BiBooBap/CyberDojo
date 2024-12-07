import React from "react";

const NegozioPunti = () => {
  return (
    <div>
      <h1 className="font-Montserrat justify-self-center font-bold text-xl mb-3 mt-3">
        Negozio Punti
      </h1>
      <div className="card-body p-3">
        <img
          src="/img/base"
          alt="Foto oggetto"
          className="logo w-14 h-14"
        ></img>
        <h3 className="font-bold">Qui andrà il nome del oggetto</h3>
        <button className="button-CD p-[7px]">buttonPrezzo</button>
      </div>
    </div>
  );
};

export default NegozioPunti;
