import { getUserName } from "../utils/auth";

const shopService = {
  getItems: async () => {
    try {
      const response = await fetch("http://localhost:3001/shop/items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Errore nel recupero degli oggetti");
      }
      const data = await response.json();
      console.log("Data:", data);
      return data;
    } catch (error) {
      console.error("Errore nel recupero degli oggetti:", error);
      throw error;
    }
  },

  purchaseItem: async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      const username = getUserName();
      const response = await fetch("http://localhost:3001/shop/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, itemId }),
      });
      if (!response.ok) {
        throw new Error("Errore durante l'acquisto dell'oggetto");
      }
      return await response.json();
    } catch (error) {
      console.error("Errore durante l'acquisto dell'oggetto:", error);
      throw error;
    }
  },

  getUserInventory: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/shop/inventory`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Errore nel recupero dell'inventario");
      }
      return await response.json();
    } catch (error) {
      console.error("Errore nel recupero dell'inventario:", error);
      throw error;
    }
  },

  isItemInInventory: async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/shop/isItemInInventory?itemId=${itemId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Errore nel controllo dell'inventario");
      }
      return await response.json();
    } catch (error) {
      console.error("Errore nel controllo dell'inventario:", error);
      throw error;
    }
  },
};

export default shopService;
