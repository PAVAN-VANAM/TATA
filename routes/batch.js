const express = require("express");
const jwt = require("jsonwebtoken");
const prisma = require("../db");

const router = express.Router();
require("dotenv").config();

// Middleware to parse JSON
router.use(express.json());

// Create a new batch
router.post("/create", async (req, res) => {
  const { batch_name, faculty } = req.body;
  try {
    const exist = await prisma.batch.findUnique({
      where: { batch_name: batch_name },
    });
    if (exist) {
      res.status(200).json("already_created");
      return;
    }
    const newBatch = await prisma.batch.create({
      data: {
        batch_name,
        faculty,
        token: "dummy",
      },
    });
    res.status(201).json(newBatch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/batches", async (req, res) => {
  try {
    const batches = await prisma.batch.findMany({
      include: { attendance: true }, // Include attendance records
    });
    res.json(batches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate JWT Token
router.put("/generate", async (req, res) => {
  const { batch_name } = req.body;

  // Validate user_id (you can add your own validation logic here)
  if (!batch_name) {
    return res.status(400).json({ message: "Batch Name is required" });
  }

  // Generate token
  const token = jwt.sign({ batch_name }, process.env.JWT_SECRET, {
    expiresIn: "5min",
  });

  const updatedBatch = await prisma.batch.update({
    where: { batch_name: batch_name },
    data: { token: token },
  });

  res.json({ updatedBatch });
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
