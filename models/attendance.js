// models/attendance.js

const pool = require('./db');

/*
 * Mark attendance for a user.
 * param {number} user_id - The ID of the user.
 * param {boolean} attendance - Attendance status (true for present, false for absent).
 * returns - The inserted attendance record.
 */
const markAttendance = async (user_id, attendance) => {
  const query = `
    INSERT INTO attendance (user_id, attendance)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [user_id, attendance];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/*
 * Retrieve attendance records for a user.
 * param {number} user_id - The ID of the user.
 * returns - Array of attendance records.
 */
const getAttendanceByUserId = async (user_id) => {
  const query = `
    SELECT user_id, attendance
    FROM attendance
    WHERE user_id = $1
    ORDER BY user_id DESC;
  `;
  const values = [user_id];
  const { rows } = await pool.query(query, values);
  return rows;
};

/*
 * Optionally, retrieve all attendance records.
 * @returns - Array of all attendance records.
 */
const getAllAttendance = async () => {
  const query = `
    SELECT user_id, attendance
    FROM attendance
    ORDER BY user_id DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

/*
 * Optionally, update an attendance record.
 * param {number} attendance_id - The ID of the attendance record.
 * param {boolean} attendance - The updated attendance status.
 * returns - The updated attendance record.
 */
const updateAttendance = async (attendance_id, attendance) => {
  const query = `
    UPDATE attendance
    SET attendance = $2
    WHERE user_id = $1
    RETURNING *;
  `;
  const values = [attendance_id, attendance];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/*
 * Optionally, delete an attendance record.
 * param {number} attendance_id - The ID of the attendance record.
 */
const deleteAttendance = async (attendance_id) => {
  const query = `
    DELETE FROM attendance
    WHERE user_id = $1;
  `;
  const values = [attendance_id];
  await pool.query(query, values);
};

module.exports = {
  markAttendance,
  getAttendanceByUserId,
  getAllAttendance,
  updateAttendance,
  deleteAttendance,
};
