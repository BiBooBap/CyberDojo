// client/src/Shop.jsx

import React, { useEffect, useState } from "react";
import { isUserLoggedIn } from "../utils/auth";
import shopFacade from "../services/shopFacade";

const ShopItem = ({ item }) => {
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    async function checkIfPurchased() {
      try {
        const response = await shopFacade.isItemInInventory(item._id);
        setIsPurchased(response.isInInventory);
      } catch (error) {
        console.error("Errore nel controllo dell'inventario:", error);
      }
    }
    checkIfPurchased();
  }, [item._id]);

  const handlePurchase = async () => {
    if (!isUserLoggedIn()) {
      alert("È necessario essere autenticati per acquistare gli oggetti.");
      return;
    }

    try {
      await shopFacade.purchase(item._id);
      alert("Acquisto avvenuto con successo!");
      setIsPurchased(true);
      window.location.reload();
    } catch (error) {
      console.error("Errore durante l'acquisto dell'oggetto:", error);
      alert("Errore durante l'acquisto dell'oggetto.");
    }
  };

  return (
    <div className="card-body p-6 mb-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center w-80">
<img
  src={item.image_path}
  alt="Foto oggetto"
  className="logo w-14 h-14"
/>
      <h3 className="font-bold text-lg text-center mb-2">{item.name}</h3>
      <p className="text-xs mb-1 text-center">{item.description}</p>
      <button
        className="button-CD px-4 py-2 bg-[#e0a11b] text-white rounded hover:bg-[#d18f1a] transition duration-200"
        onClick={handlePurchase}
        disabled={isPurchased}
      >
        {isPurchased ? "Già acquistato" : `Acquista per ${item.price} punti`}
      </button>
    </div>
  );
};

const NegozioPunti = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await shopFacade.getItems();
        setItems(data);
      } catch (error) {
        console.error("Errore nel recupero degli oggetti:", error);
        setError(error.message);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="px-8 py-4">
      <h1 className="font-Montserrat justify-self-center font-bold text-xl mb-3 mt-3">
        Negozio Punti
      </h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {items.map((item) => (
            <ShopItem key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NegozioPunti;