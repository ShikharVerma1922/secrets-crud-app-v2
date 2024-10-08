import db from "../../config/db.js";

const postComment = async (postId, userId, content) => {
  const query = `INSERT INTO comments (post_id, user_id, comment_text) VALUES ($1, $2, $3) RETURNING *`;
  const values = [postId, userId, content];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getComments = async (postId) => {
  const query = `SELECT c.id, c.comment_text, c.created_at, u.name FROM comments c JOIN users u ON c.user_id = u.id WHERE c.post_id = $1 ORDER BY c.created_at ASC`;
  const values = [postId];
  const result = await db.query(query, values);
  return result.rows;
};

const getCommentCount = async (postId) => {
  const query = `SELECT COUNT(*) AS total_comments FROM comments WHERE post_id = $1`;
  const values = [postId];
  const result = await db.query(query, values);
  return result.rows[0];
};

const deleteComment = async (commentId) => {
  const query = `DELETE FROM comments WHERE id = $1 RETURNING id`;
  const values = [commentId];
  const result = await db.query(query, values);
  return result.rows[0];
};

export { postComment, getComments, getCommentCount, deleteComment };
