import React from 'react';

// Terms and Conditions
const TerminiECondizioni = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card-body py-8 px-6 bg-white rounded shadow-md w-3/4">
        <h1 className="text-[#f7d1cd] font-bold text-2xl justify-self-center mb-4">
          Termini e Condizioni
        </h1>
        <p className="mb-4">
          Benvenuto nei nostri Termini e Condizioni. Utilizzando il nostro servizio, accetti di rispettare i termini descritti di seguito.
        </p>

        <h2 className="text-xl font-semibold mb-2">Uso del Servizio</h2>
        <p className="mb-2">
          L'utente si impegna a utilizzare il nostro servizio in conformità con le leggi applicabili e a non svolgere attività illegali o non autorizzate.
        </p>

        <h2 className="text-xl font-semibold mb-2">Account Utente</h2>
        <p className="mb-2">
          Per accedere a determinate funzionalità, potrebbe essere necessario creare un account. L'utente è responsabile di mantenere riservate le proprie credenziali.
        </p>

        <h2 className="text-xl font-semibold mb-2">Limitazione di Responsabilità</h2>
        <p className="mb-2">
          Non saremo responsabili per eventuali danni derivanti dall'uso improprio del nostro servizio o da interruzioni non previste.
        </p>

        <h2 className="text-xl font-semibold mb-2">Modifiche ai Termini</h2>
        <p className="mb-4">
          Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Ti invitiamo a controllare periodicamente questa pagina per eventuali aggiornamenti.
        </p>
      </div>
    </div>
  );
};

export default TerminiECondizioni;