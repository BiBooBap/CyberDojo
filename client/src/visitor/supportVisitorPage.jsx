import React from "react";

function SupportVisitorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-[#f7d1cd]">
      <div className="bg-[#4b2153] p-8 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Hai bisogno di aiuto?</h1>
        <p className="mb-4">
          Se hai bisogno di supporto, puoi contattarci all'indirizzo email:
        </p>
        <p className="mb-4 font-semibold">supporto@example.com</p>
        <p className="mb-4">
          Per favore, segui queste istruzioni per inviare la tua email:
        </p>
        <ul className="list-disc list-inside mb-4 text-left">
          <li>Indica chiaramente il problema che stai riscontrando.</li>
          <li>Fornisci eventuali dettagli o screenshot utili.</li>
          <li>Includi le informazioni sul dispositivo e browser che stai utilizzando.</li>
        </ul>
        <p className="mb-4">
          Il nostro team di supporto ti risponderà il prima possibile.
        </p>
      </div>
    </div>
  );
}

export default SupportVisitorPage;