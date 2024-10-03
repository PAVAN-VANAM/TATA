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
      data: {
        userId,
        name,
        password,
        department,
        batchNames,
      },
    });
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
    const { userId, password } = req.body;

    // Retrieve user
    const user = await prisma.profile.findUnique({
      where: { userId: userId },
    });
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

router.post("/view", async (req, res) => {
  const { batch_name } = req.body;
  try {
    // Find all profiles where batchNames array contains "vihaan-3yr-MERN-B-3"
    const profiles = await prisma.profile.findMany({
      where: {
        batchNames: {
          has: batch_name, // Matches profiles where batchNames array contains this value
        },
      },
      include: {
        attendance: true, // Include all attendance records
      },
    });

    // Filter the attendance by batch_name in the application
    const filteredProfiles = profiles.map((profile) => {
      profile.attendance = profile.attendance.filter(
        (att) => att.batch_name === batch_name
      );
      return profile;
    });

    res.json(filteredProfiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving profiles.");
  }
});

module.exports = router;
