import db from "../../config/db.js";

const getUser = async (userId) => {
  const query = `SELECT * FROM users WHERE id = $1`;
  const values = [userId];
  const result = await db.query(query, values);
  return result.rows[0];
};

const checkUserName = async (name) => {
  const query = `SELECT * FROM users WHERE name = $1`;
  const values = [name];
  const result = await db.query(query, values);
  return result.rows[0];
};

const updateUserName = async (name, userId) => {
  const query = `UPDATE users SET name = $1 WHERE id = $2 RETURNING *`;
  const values = [name, userId];
  const result = await db.query(query, values);
  return result.rows[0];
};

const deleteUser = async (userId) => {
  const query = `DELETE FROM users WHERE id = $1 RETURNING id`;
  const values = [userId];
  const result = await db.query(query, values);
  return result.rows[0];
};

export { getUser, checkUserName, updateUserName, deleteUser };
