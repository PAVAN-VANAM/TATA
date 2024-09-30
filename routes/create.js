const express = require("express");
const prisma = require("../models/db");
require("dotenv").config();

const router = express.Router();

router.post("/batch", async (req, res) => {
  const { batch_name, faculty } = req.body;
  try {
    const exist = await prisma.batch.findUnique({
      where: { batch_name: batch_name },
    });
    if (exist) {
      res.status(201).json({ msg: "Batch Name is already in use " });
      return;
    }

    const batch = await prisma.batch.create({
      data: {
        batch_name: batch_name,
        faculty: faculty,
        token: "batch2024-token",
      },
    });
    console.log(batch);
    res.status(200).json(batch);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/profile", async (req, res) => {
  const { userId, name, password, department, batch_name } = req.body;
  try {
    let batchId = null;
    const batch = await prisma.batch.findUnique({
      where: {
        batch_name: batch_name, // Filtering by batch_name
      },
    });
    if (batch) {
      console.log(`Batch ID :`, batch.batchId);
      batchId = batch.batchId;
    }

    const exist = await prisma.profile.findUnique({
      where: { userId: userId },
    });
    if (exist) {
      res.status(201).json({ msg: " User ID is already in use " });
      return;
    }

    const newProfile = await prisma.profile.create({
      data: {
        userId: userId,
        name: name,
        password: password,
        department: department,
        batchIds: [batchId], // Linking to the batch created above
      },
    });
    console.log("New Profile:", newProfile);
    res.status(200).json(newProfile);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
