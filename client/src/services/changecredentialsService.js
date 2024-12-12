const ChangeCredentialsService = {
    getUserInfo: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/auth/credentials/user-info', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Errore nel recupero delle informazioni utente.');
            }
    
            const data = await response.json();
            return data;
        } catch(error) {
            console.error('Errore durante il recupero delle informazioni utente:', error);
            throw error;
        }
    },

    sendNewCredentials: async (formData) => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch("http://localhost:3001/auth/credentials/update-user-info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
          
          if (!response.ok) {

            const errorData = await response.json();
            throw new Error(errorData.message || 'Errore durante l\'aggiornamento delle credenziali.');
          }
    
          const data = await response.json();

          // If a new token is present, update the localStorage
          if (data.token) {
            localStorage.setItem('token', data.token);
          }

        return data;

        } catch (error) {
            console.error("Errore durante l'aggiornamento delle credenziali:", error);
            throw error;
        }
    },

    verifyPassword: async (currentPassword) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:3001/auth/credentials/verify-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ currentPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Errore durante la verifica della password.");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Errore durante la verifica della password:", error);
            throw error;
        }
    },

    deleteAccount: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/auth/delete-user', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Errore durante l\'eliminazione dell\'account.');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Errore durante l\'eliminazione dell\'account:', error);
            throw error;
        }
    }
};

    export default ChangeCredentialsService;