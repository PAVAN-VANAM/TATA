// routes/attendance.js

const express = require("express");
const { getTokenByBatchname } = require("../models/batch");
const { getUserById } = require("../models/profile");
const {
  markAttendance,
  getAttendanceByUserId,
  deleteAttendance,
} = require("../models/attendance");
require("dotenv").config();

const router = express.Router();

/**
 * Mark attendance for the authenticated user.
 */
router.post("/mark", async (req, res) => {
  try {
    const { user_id, batch_name, token, attendance } = req.body;
    // Optionally, verify if the user exists
    const Orginaltoken = await getTokenByBatchname(batch_name);
    /* const user = await getUserById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } */
    console.log(Orginaltoken.token);
    console.log(token);
    try {
      const exist = await getAttendanceByUserId(user_id);
      console.log(exist);
      if (exist) {
        res
          .status(200)
          .json({ message: "existed Attendance Marked successfully" });
        return;
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      res.status(500).json({ message: "Internal server error" });
    }

    const attendance_id = user_id;
    // Mark attendance
    if (token == Orginaltoken.token) {
      const attendanceRecord = await markAttendance(
        attendance_id,
        attendance,
        batch_name
      );
      console.log(attendanceRecord);
      res.status(201).json({ message: "Attendance Marked successfully" });
    } else {
      res.status(404).json({ msg: "Invalid" });
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

router.delete("/delete", async (req, res) => {
  try {
    // Retrieve attendance records
    const attendanceRecords = await deleteAttendance();
    console.log(attendanceRecords);
    res.json({ msg: "All Clear" });
  } catch (error) {
    console.error("Error retrieving attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
