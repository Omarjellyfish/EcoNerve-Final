const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided" });
  }

  try {
    // Check for "Bearer " prefix and extract the token part
    const tokenPart = token.split(" ")[1];
    if (!tokenPart) {
      return res.status(400).json({ message: "Invalid Token Format" });
    }

    // Verify the token
    const decoded = jwt.verify(tokenPart, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to `req`

    next(); // Proceed to the next middleware
  } catch (err) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
}

module.exports = { authenticateToken };
