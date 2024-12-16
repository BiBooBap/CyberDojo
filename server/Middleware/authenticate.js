const jwt = require("jsonwebtoken");
const secretKey = "sigmasigmaonthewall";

// Middleware to verify token validity
const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");

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
