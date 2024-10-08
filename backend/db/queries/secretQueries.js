import db from "../../config/db.js";

const postSecret = async (userId, content) => {
  console.log(userId);

  const query = `INSERT INTO posts (user_id, content) VALUES($1, $2) RETURNING *`;
  const values = [userId, content];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getRecentSecrets = async () => {
  const query = `SELECT p.id, p.content, p.created_at, p.user_id, u.name FROM posts p LEFT JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC`;
  const result = await db.query(query);
  return result.rows;
};

const getTopSecrets = async () => {
  const query = `SELECT p.id,p.content,p.created_at, p.user_id,u.name,COUNT(CASE WHEN ld.like_dislike = TRUE THEN 1 END) AS likes_count FROM posts p LEFT JOIN likes_dislikes ld ON p.id = ld.post_id LEFT JOIN users u ON p.user_id = u.id GROUP BY p.id, u.name ORDER BY likes_count DESC , p.created_at DESC`;
  const result = await db.query(query);
  return result.rows;
};

const getUserSecrets = async (userId) => {
  const query = `SELECT p.id, p.content, p.created_at, p.user_id, u.name FROM posts p LEFT JOIN users u ON p.user_id = u.id WHERE user_id = $1 ORDER BY p.created_at DESC`;
  const values = [userId];
  const result = await db.query(query, values);
  return result.rows;
};

const deleteSecret = async (postId) => {
  const query = `DELETE FROM posts WHERE id = $1 RETURNING id`;
  const values = [postId];
  const result = await db.query(query, values);
  return result.rows[0];
};

export {
  postSecret,
  getRecentSecrets,
  getTopSecrets,
  getUserSecrets,
  deleteSecret,
};
