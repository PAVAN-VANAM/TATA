// routes/attendance.js
const jwt = require("jsonwebtoken");
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

// Decode function

function decodeToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided." });
  }

  // Remove 'Bearer ' from the token string (if using Bearer format)
  const extractedToken = token.split(" ")[1];
  console.log(extractedToken);
  // Verify and decode the token
  jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Failed to authenticate token." });
    }
    // Save decoded information to request object
    req.user = decoded;
    next();
  });
}

router.post("/mark", decodeToken, async (req, res) => {
  try {
    const { userId, attendance } = req.body;
    // Optionally, verify if the user exists
    const batch_name = req.user.batch_name;

    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        userId: userId,
        batch_name: batch_name,
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

    const profiles = await prisma.profile.findUnique({
      where: {
        userId: userId,
        batchNames: {
          has: batch_name, // Matches profiles where batchNames array contains this value
        },
      },
    });
    if (profiles != null) {
      // Mark attendance
      const newAttendance = await prisma.attendance.create({
        data: {
          userId: userId,
          batch_name: batch_name,
          attendance: attendance,
          date: formattedDate,
        },
      });
      console.log(newAttendance);
      res.status(201).json({
        message: "Attendance Marked successfully",
        user: newAttendance,
      });
    } else {
      return res.status(201).json({ message: "Your are not in this Batch!!" });
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

router.post("/update", async (req, res) => {
  try {
    const { userId, batch_name, attendance } = req.body;
    // Retrieve attendance records
    const newAttendance = await prisma.attendance.create({
      data: {
        userId: userId,
        batch_name: batch_name,
        attendance: attendance,
        date: formattedDate,
      },
    });
    console.log(newAttendance);
    res.status(201).json({
      message: "Attendance Marked successfully",
    });
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
