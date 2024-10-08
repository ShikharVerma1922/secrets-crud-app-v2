import db from "../../config/db.js";

// Register a new user
const createUser = async (name, email, hashedPassword) => {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at
  `;
  const values = [name, email, hashedPassword];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Find user by email
const findUserByEmail = async (email) => {
  const query = `
      SELECT * FROM users WHERE email = $1
    `;
  const values = [email];
  const result = await db.query(query, values);
  return result.rows[0];
};

export { createUser, findUserByEmail };
