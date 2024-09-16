const express = require("express");
const jwt = require("jsonwebtoken");

const { updateToken } = require("../models/batch");
const router = express.Router();
require("dotenv").config();

// Generate JWT Token
router.post("/", async (req, res) => {
  const { user_id, batch_id } = req.body;

  // Validate user_id (you can add your own validation logic here)
  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Generate token
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const record = await updateToken(batch_id, token);

  res.json({ record });
});

// verify user_id (you can add your own validation logic here)

// Middleware to verify JWT Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(user);
    next();
  });
};

// Protected Route
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
