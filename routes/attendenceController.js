// routes/attendance.js

const express = require("express");
const { getTokenByBatchId } = require("../models/batch");
const { getUserById } = require("../models/profile");
const { markAttendance } = require("../models/attendance");
require("dotenv").config();

const router = express.Router();

/**
 * Mark attendance for the authenticated user.
 */
router.post("/mark", async (req, res) => {
  try {
    const { user_id, batch_id, token, attendance } = req.body;
    // Optionally, verify if the user exists
    const Orginaltoken = await getTokenByBatchId(batch_id);
    /* const user = await getUserById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } */
    console.log(Orginaltoken.token);
    console.log(token);
    // Mark attendance
    if (token == Orginaltoken.token) {
      const attendanceRecord = await markAttendance(user_id, attendance);
      res.status(201).json({ attendance: attendanceRecord });
    } else {
      res.status(404).json({ msg: "Check Your scan ...." });
    }
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * View attendance records for the authenticated user.
 */
router.get("/view", async (req, res) => {
  try {
    const user_id = req.body.userId;

    // Retrieve attendance records
    const attendanceRecords = await getAttendanceByUserId(user_id);
    res.json({ attendance: attendanceRecords });
  } catch (error) {
    console.error("Error retrieving attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
