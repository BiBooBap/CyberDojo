// client/src/utils/auth.js
export function isUserLoggedIn() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiration = payload.exp;

    if (Date.now() >= expiration * 1000) {
      // Il token è scaduto
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
}

export function getUserRole() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role; // Assumendo che il ruolo sia memorizzato nel campo 'role' del payload
  } catch (e) {
    return null;
  }
}
