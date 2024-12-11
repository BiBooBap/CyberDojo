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
      setIsPurchased(true); // Aggiorna lo stato dopo l'acquisto
    } catch (error) {
      console.error("Errore durante l'acquisto dell'oggetto:", error);
      alert("Errore durante l'acquisto dell'oggetto.");
    }
  };

  return (
    <div key={item._id} className="card-body p-3 mb-3">
      <img src={item.image_path} alt="Foto oggetto" className="logo w-14 h-14" />
      <h3 className="font-bold">{item.name}</h3>
      <p className="text-xs mb-1">{item.description}</p>
      <button
        className="button-CD p-[7px]"
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
    <div>
      <h1 className="font-Montserrat justify-self-center font-bold text-xl mb-3 mt-3">
        Negozio Punti
      </h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        items.map((item) => (
          <ShopItem key={item._id} item={item} />
        ))
      )}
    </div>
  );
};

export default NegozioPunti;
