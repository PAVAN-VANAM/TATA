// routes/attendance.js

const express = require("express");
require("dotenv").config();
const prisma = require("../db");
const router = express.Router();

/**
 * Mark attendance for the authenticated user.
 */

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11
const day = String(today.getDate()).padStart(2, "0");

const formattedDate = `${day}-${month}-${year}`;
console.log(formattedDate);

router.post("/mark", async (req, res) => {
  try {
    const { userId, batch_name, token, attendance } = req.body;
    // Optionally, verify if the user exists
    const Orginaltoken = await prisma.batch.findUnique({
      where: { batch_name: batch_name },
    });
    /* const user = await getUserById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } */
    console.log(Orginaltoken.token);
    console.log(token);
    try {
      const attendanceRecords = await prisma.attendance.findMany({
        where: {
          userId: userId,
          date: formattedDate,
        },
      });
      console.log(attendanceRecords);
      if (attendanceRecords.length > 0) {
        res
          .status(200)
          .json({ message: "existed Attendance Marked successfully" });
        return;
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      res.status(500).json({ message: "Internal server error" });
    }

    // Mark attendance
    if (token == Orginaltoken.token) {
      const newAttendance = await prisma.attendance.create({
        data: {
          userId: userId,
          batch_name: batch_name,
          attendance: attendance,
          date: formattedDate,
        },
      });
      console.log(newAttendance);
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
    // Retrieve attendance records
    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        userId: user_id,
      },
    });
    console.log(attendanceRecords);

    res.json({ attendanceRecords });
  } catch (error) {
    console.error("Error retrieving attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// get all attendance data

router.get("/viewAll", async (req, res) => {
  try {
    // Retrieve attendance records
    const allAttendanceRecords = await prisma.attendance.findMany({
      orderBy: {
        userId: "desc",
      },
    });
    console.log(allAttendanceRecords);

    res.json({ allAttendanceRecords });
  } catch (error) {
    console.error("Error retrieving attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/mernb3", async (req, res) => {
  try {
    // Retrieve attendance records
    const allAttendanceRecords = await prisma.attendance.findMany({
      where: {
        batch_name: "vihaan-3yr-MERN-B-3",
      },
      orderBy: {
        userId: "desc",
      },
    });
    console.log(allAttendanceRecords);

    res.json({ allAttendanceRecords });
  } catch (error) {
    console.error("Error retrieving attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    // Retrieve attendance records
    await prisma.attendance.delete({
      where: { attendanceId: attendance_id },
    });
    res.json({ msg: "All Clear" });
  } catch (error) {
    console.error("Error retrieving attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
