// routes/auth.js

const express = require("express");
const { createUser, getUserById } = require("../models/profile");
require("dotenv").config();

const router = express.Router();

/**
 * Register a new user.
 */
router.post("/register", async (req, res) => {
  try {
    const { user_id, name, password, batch_id } = req.body;

    // Check if user already exists
    const existingUser = await getUserById(user_id);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await createUser(user_id, name, password, batch_id);
    res.status(201).json({ user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Login a user.
 */
router.get("/login", async (req, res) => {
  try {
    const { user_id, password } = req.body;

    // Retrieve user
    const user = await getUserById(user_id);
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    if (password != user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ user: user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
