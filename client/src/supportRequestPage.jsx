import React, { useState } from "react";
import apiService from "./services/apiServices";

function SupportRequest() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Regex per la validazione
    const categoryRegex = /^(Problema tecnico|Altro)$/;
    const descriptionRegex = /^.{10,}$/; // Almeno 10 caratteri

    // Validazione dell'input
    if (!categoryRegex.test(selectedCategory)) {
      alert("Per favore, seleziona una categoria valida.");
      return;
    }

    if (!descriptionRegex.test(description)) {
      alert("La descrizione deve contenere almeno 10 caratteri.");
      return;
    }

    const requestData = {
      category: selectedCategory,
      description: description,
    };

    try {
      const result = await apiService.sendSupportRequest(requestData);
      console.log("Richiesta inviata con successo:", result);
    } catch (error) {
      console.error("Errore durante l'invio della richiesta:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="bg-yellow-500 rounded-lg p-8 shadow-lg w-80">
          <h2 className="text-white text-2xl font-bold mb-6 text-center">Richiedi supporto</h2>
          <div className="mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 rounded text-gray-700"
            >
              <option value="">Seleziona un categoria</option>
              <option value="Problema tecnico">Problema tecnico</option>
              <option value="Altro">Altro</option>
            </select>
          </div>
          <div className="mb-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded text-gray-700"
              placeholder="Descrivi il tuo problema"
              rows="4"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-[#54295c] text-white py-2 rounded"
          >
            Invia richiesta
          </button>
        </div>
      </main>
    </div>
  );
}

export default SupportRequest;
