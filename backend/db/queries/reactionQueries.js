import db from "../../config/db.js";

const postReaction = async (postId, userId, likeDislike) => {
  const query = `INSERT INTO likes_dislikes (user_id, post_id, like_dislike)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, post_id)
    DO UPDATE SET like_dislike = EXCLUDED.like_dislike RETURNING post_id`;
  const values = [userId, postId, likeDislike];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getReaction = async (postId, userId) => {
  const query = `SELECT like_dislike FROM likes_dislikes WHERE post_id = $1 AND user_id = $2`;
  const values = [postId, userId];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getReactionCount = async (postId) => {
  const query = `SELECT SUM(CASE WHEN like_dislike THEN 1 ELSE 0 END) AS likes, SUM(CASE WHEN like_dislike = false THEN 1 ELSE 0 END) AS dislikes FROM likes_dislikes WHERE post_id = $1`;
  const values = [postId];
  const result = await db.query(query, values);
  return result.rows[0];
};

export { postReaction, getReaction, getReactionCount };
