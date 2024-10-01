// routes/auth.js

const express = require("express");

const prisma = require("../db");
require("dotenv").config();

const router = express.Router();

/**
 * Register a new user.
 */
router.post("/create", async (req, res) => {
  try {
    const { userId, name, password, department, batchNames } = req.body;

    // Check if user already exists
    const existingUser = await prisma.profile.findUnique({
      where: { userId: userId },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    

    // Create user
    const user = await prisma.profile.create({
      data:{
        
        userId,
        name,
        password,
        department,
        batchNames
      }
    }
    );
    res.status(201).json({ user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Login a user.
 */
router.post("/login", async (req, res) => {
  try {
    const { user_id, password } = req.body;

    // Retrieve user
    const user = await prisma.profile.findUnique({
      where: { userId: user_id },
    });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    if (password != user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const batch = user.batchIds;
    const batch_id = batch[0];
    const batches = await prisma.batch.findMany({
      where: {
        batchId: batch_id, // Find all batches with the provided batchIds
      },
    });
    //console.log(batches);
    res.json({ user: user, batch_name: batches[0].batch_name });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
