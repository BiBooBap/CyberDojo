import React from 'react';

//Component for the Privacy Policy page
const Privacy = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card-body py-8 px-6 bg-white rounded shadow-md w-3/4">
        <h1 className="text-[#f7d1cd] font-bold text-2xl justify-self-center mb-4">
          Informativa sulla Privacy
        </h1>
        <p className="mb-4">
          La tua privacy è importante per noi. Questa informativa spiega come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.
        </p>

        <h2 className="text-xl font-semibold mb-2">Dati Raccolti</h2>
        <p className="mb-2">
          Possiamo raccogliere i seguenti dati personali:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Indirizzo Email</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Come Utilizziamo i Dati</h2>
        <p className="mb-2">
          Utilizziamo i dati raccolti per:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Fornire i nostri servizi</li>
          <li>Migliorare la tua esperienza utente</li>
          <li>Inviare comunicazioni importanti</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Protezione dei Dati</h2>
        <p className="mb-2">
          Adottiamo misure di sicurezza adeguate per proteggere i tuoi dati personali da accessi non autorizzati, alterazioni, divulgazioni o distruzioni.
        </p>
      </div>
    </div>
  );
};

export default Privacy;