export function isUserLoggedIn() { // Function to check if the user is logged in
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

// Function to get the user role
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

// Function to get the user name
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

// Function to get the payload
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
