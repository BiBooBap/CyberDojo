import React from "react";

// SupportVisitorPage component
function SupportVisitorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#ffffff] p-4">
      <div className="bg-[#4b2153] p-4 md:p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-xl md:text-2xl font-bold mb-4">Hai bisogno di aiuto?</h1>
        <p className="mb-4">
          Se hai bisogno di supporto, puoi contattarci all'indirizzo email:
        </p>
        <p className="mb-4 font-semibold">info@cyberdojo.it</p>
        <p className="mb-4">
          Per favore, segui queste istruzioni per inviare la tua email:
        </p>
        <ul className="list-disc list-inside mb-4 text-left">
          <li className="mb-2">Indica chiaramente il problema che stai riscontrando.</li>
          <li className="mb-2">Fornisci eventuali dettagli o screenshot utili.</li>
          <li className="mb-2">Includi le informazioni sul dispositivo e browser che stai utilizzando.</li>
        </ul>
        <p className="mb-4">
          Il nostro team di supporto ti risponderà il prima possibile.
        </p>
      </div>
    </div>
  );
}

export default SupportVisitorPage;