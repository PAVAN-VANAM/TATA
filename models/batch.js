// models/jwtToken.js

const Prisma = require('./db');
/*
 * Create a new JWT token for a batch.
 * @param {number} batch_id - The ID of the batch.
 * @param {string} token - The JWT token.
 * @returns {Promise<Object>} - The inserted token record.
 */
const createBatch = async (batch_id, batch_name, token) => {
  const findBatch = await Prisma.Batch

  const query = `
    INSERT INTO batch (batch_id,batch_name, token)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [batch_id, batch_name, token];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/*
 * Retrieve a JWT token by batch_id.
 * @param {number} batch_id - The ID of the batch.
 * @returns {Promise<Object>} - The token record.
 */
const getTokenByBatchId = async (batch_id) => {
  const query = `
    SELECT * FROM batch
    WHERE batch_id = $1;
  `;
  const values = [batch_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getTokenByBatchname = async (batch_name) => {
  const query = `
    SELECT * FROM batch
    WHERE batch_name = $1;
  `;
  const values = [batch_name];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/*
 * Update a JWT token for a batch.
 * @param {number} batch_id - The ID of the batch.
 * @param {string} token - The new JWT token.
 * @returns {Promise<Object>} - The updated token record.
 */
const updateToken = async (batch_id, token) => {
  const query = `
    UPDATE batch
    SET token = $2
    WHERE batch_id = $1
    RETURNING *;
  `;
  const values = [batch_id, token];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/*
 * Delete a JWT token by batch_id.
 * @param {number} batch_id - The ID of the batch.
 * @returns {Promise<void>}
 */
const deleteToken = async (batch_id) => {
  const query = `
    DELETE FROM batch
    WHERE batch_id = $1;
  `;
  const values = [batch_id];
  await pool.query(query, values);
};

module.exports = {
  createToken,
  getTokenByBatchname,
  getTokenByBatchId,
  updateToken,
  deleteToken,
};
