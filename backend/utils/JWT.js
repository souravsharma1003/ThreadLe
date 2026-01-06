const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Store securely in env

// ✅ Function to create/generate JWT Token
function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" }); // Token valid for 7 days
}

// ✅ Function to decode/verify JWT Token
function decodeToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET); // returns decoded payload if valid
  } catch (error) {
    return null; // invalid or expired token
  }
}

module.exports = { createToken, decodeToken };
