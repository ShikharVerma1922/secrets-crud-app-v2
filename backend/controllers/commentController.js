import {
  deleteComment,
  getCommentCount,
  getComments,
  postComment,
} from "../db/queries/commentQueries.js";

// Post a comment on a post
const postCommentFunc = async (req, res) => {
  const { postId } = req.params;
  const { comment_text, userId } = req.body;

  try {
    const result = await postComment(postId, userId, comment_text);
    if (!result) {
      return res.status(404).json({ message: "Comment unsuccessful" });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get total comments on a post
const getCommentsFunc = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await getComments(postId);
    if (!comments) {
      return res.status(404).json({ message: "No comments found" });
    }
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get total comments for a post
const getCommentCountFunc = async (req, res) => {
  const { postId } = req.params;

  try {
    const totalCommentCount = await getCommentCount(postId);
    if (!totalCommentCount) {
      return res.status(404).json({ message: "No comments found" });
    }
    const totalComments = parseInt(totalCommentCount.total_comments, 10);
    res.status(200).json({ totalComments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete user's comment from a post
const deleteCommentFunc = async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await deleteComment(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not deleted" });
    }
    res.status(200).json({ message: "Comment deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  postCommentFunc,
  getCommentsFunc,
  getCommentCountFunc,
  deleteCommentFunc,
};
