export function isUserLoggedIn() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiration = payload.exp;

    if (Date.now() >= expiration * 1000) {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
}

export function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch (error) {
    console.error("Errore nel parsing del token:", error);
    return null;
  }
}

export function getUserName() {
  const token = localStorage.getItem("token");

  if (!token) {
    return "";
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.username;
  } catch (e) {
    return null;
  }
}

export function getPayload() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    console.error("Errore nel parsing del token:", error);
    return null;
  }
}
