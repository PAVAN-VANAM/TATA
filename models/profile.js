// models/profile.js

const pool = require("./db");

/*
 * Create a new user profile.
 * @param {string} name - The user's name.
 * @param {string} password - The user's password (plaintext).
 * @param {number} batch_id - The ID of the batch the user belongs to.
 * @returns {Promise<Object>} - The created user profile.
 */
const createUser = async (user_id, name, password, batch_id) => {
  const query =
    "INSERT INTO profile (user_id , name, password, batch_id) VALUES ( $1, $2, $3, $4)RETURNING user_id, name, batch_id;";
  const values = [user_id, name, password, batch_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/*
 * Retrieve a user profile by user_id.
 * @param {number} user_id - The ID of the user.
 * @returns {Promise<Object>} - The user profile.
 */
const getUserById = async (user_id) => {
  const query =
    "SELECT user_id, name,password, batch_id FROM profile WHERE user_id = $1;";
  const values = [user_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/*
 * Retrieve a user profile by batch_id.
 * This assumes you want to get a user associated with a specific batch.
 * If multiple users can be in the same batch, consider returning an array.
 * @param {number} batch_id - The ID of the batch.
 * @returns {Promise<Array>} - Array of user profiles.
 */
const getUsersByBatchId = async (batch_id) => {
  const query = `
    SELECT user_id, name, batch_id
    FROM profile
    WHERE batch_id = $1;
  `;
  const values = [batch_id];
  const { rows } = await pool.query(query, values);
  return rows;
};

/*
 * Retrieve a user by name. Useful for login if usernames are unique.
 * Adjust accordingly based on your authentication strategy.
 * @param {string} name - The name of the user.
 * @returns {Promise<Object>} - The user profile including password.
 */
const getUserByName = async (name) => {
  const query = `
    SELECT *
    FROM profile
    WHERE name = $1;
  `;
  const values = [name];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/*
 * Update a user's password.
 * @param {number} user_id - The ID of the user.
 * @param {string} newPassword - The new password (plaintext).
 * @returns {Promise<Object>} - The updated user profile.
 */
const updateUserPassword = async (user_id, newPassword) => {
  const query = `
    UPDATE profile
    SET password = $2
    WHERE user_id = $1
    RETURNING user_id, name, batch_id;
  `;
  const values = [user_id, newPassword];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/*
 * Delete a user profile by user_id.
 * @param {number} user_id - The ID of the user.
 * @returns {Promise<void>}
 */
const deleteUser = async (user_id) => {
  const query = `
    DELETE FROM profile
    WHERE user_id = $1;
  `;
  const values = [user_id];
  await pool.query(query, values);
};

module.exports = {
  createUser,
  getUserById,
  getUsersByBatchId,
  getUserByName,
  updateUserPassword,
  deleteUser,
};
