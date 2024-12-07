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
