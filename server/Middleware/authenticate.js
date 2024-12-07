const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key"; // Change to a secure secret key

// Middleware to authenticate the user
const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token mancante o non valido" });
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token non valido" });
  }
};

module.exports = authenticate;
