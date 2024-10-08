import db from "../../config/db.js";

const totalUserSecrets = async (userId) => {
  const query = `SELECT COUNT(*) AS totalSecrets FROM posts WHERE user_id = $1`;
  const values = [userId];
  const result = await db.query(query, values);
  return result.rows[0];
};

const totalUserReactions = async (userId) => {
  const query = `SELECT COUNT(*) AS totalLikes FROM likes_dislikes WHERE post_id IN (SELECT id FROM posts WHERE user_id = $1) AND like_dislike = 'true'`;
  const values = [userId];
  const result = await db.query(query, values);
  return result.rows[0];
};

const totalUserComments = async (userId) => {
  const query = `SELECT COUNT(*) AS totalComments FROM comments WHERE user_id = $1`;
  const values = [userId];
  const result = await db.query(query, values);
  return result.rows[0];
};

export { totalUserSecrets, totalUserComments, totalUserReactions };
