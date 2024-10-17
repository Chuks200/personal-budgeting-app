const jwt = require("jsonwebtoken");

// Middleware to authenticate user using JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) return res.sendStatus(401); // No token, unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token is invalid, forbidden

    req.user = user; // Attach the user object to the request
    next(); // Call the next middleware or route handler
  });
}

module.exports = authenticateToken;
