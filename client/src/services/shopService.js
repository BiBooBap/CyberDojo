const shopService = {
  // Function to retrieve items from the server
  getItems: async () => {
    try {
      const response = await fetch("http://localhost:3001/shop/items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Errore nel recupero degli oggetti");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore nel recupero degli oggetti:", error);
      throw error;
    }
  },

  // Function to purchase an item
  purchaseItem: async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/shop/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId }),
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

  // Function to retrieve the user's inventory
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

  // Function to check if an item is in the user's inventory
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

  // Function to retrieve the user's profile
  getUserProfile: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/shop/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Errore nel recupero del profilo utente");
      }
      return await response.json();
    } catch (error) {
      console.error("Errore nel recupero del profilo utente:", error);
      throw error;
    }
  },

  // Function to update the user's profile
  updateUserProfile: async (type, imagePath) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/shop/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type, imagePath }),
      });
      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento del profilo utente");
      }
      return await response.json();
    } catch (error) {
      console.error(
        "Errore durante l'aggiornamento del profilo utente:",
        error
      );
      throw error;
    }
  },
};

export default shopService;
