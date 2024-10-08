import db from "../../config/db.js";

const postBookmark = async (postId, userId) => {
  const query = `INSERT INTO bookmarks (post_id, user_id) VALUES ($1, $2) RETURNING *`;
  const values = [postId, userId];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getBookmarks = async (postId, userId) => {
  const query = `SELECT * FROM bookmarks WHERE post_id = $1 AND user_id = $2`;
  const values = [postId, userId];
  const result = await db.query(query, values);
  return result.rows;
};

const getUserBookmarks = async (userId) => {
  const query = `SELECT posts.id, posts.content, posts.created_at, users.name FROM bookmarks JOIN posts ON bookmarks.post_id = posts.id JOIN users ON posts.user_id = users.id WHERE bookmarks.user_id = $1`;
  const values = [userId];
  const result = await db.query(query, values);
  return result.rows;
};

const getBookmarkCount = async (postId) => {
  const query = `SELECT COUNT(*) AS total_bookmarks FROM bookmarks WHERE post_id = $1`;
  const values = [postId];
  const result = await db.query(query, values);
  return result.rows[0];
};

const deleteBookmark = async (postId, userId) => {
  const query = `DELETE FROM bookmarks WHERE post_id = $1 AND user_id = $2 RETURNING *`;
  const values = [postId, userId];
  const result = await db.query(query, values);
  return result.rows[0];
};

export {
  postBookmark,
  getBookmarks,
  getBookmarkCount,
  deleteBookmark,
  getUserBookmarks,
};
