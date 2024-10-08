import {
  getReaction,
  getReactionCount,
  postReaction,
} from "../db/queries/reactionQueries.js";

const postReactionFunc = async (req, res) => {
  const { postId } = req.params;
  const { userId, likeDislike } = req.body;

  try {
    const result = await postReaction(postId, userId, likeDislike);
    if (!result) {
      return res.status(404).json({ message: "Reaction unsuccessful" });
    }
    res.status(201).json({ message: "Reaction successfully!" });
  } catch (error) {
    console.error("Error handling like/dislike:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getReactionFunc = async (req, res) => {
  const { postId, userId } = req.params;
  // const { userId } = req.body;

  const reactions = await getReaction(postId, userId);

  if (!reactions) {
    return res.status(200).json({ reaction: 0 });
  }
  return res.status(200).json({ reaction: reactions.like_dislike });
};

const getReactionCountFunc = async (req, res) => {
  const { postId } = req.params;
  const totalReactionCount = await getReactionCount(postId);
  if (!totalReactionCount) {
    return res.status(404).json({ message: "Post not found" });
  }

  const totalLikes = parseInt(totalReactionCount.likes, 10);
  const totalDisikes = parseInt(totalReactionCount.dislikes, 10);
  res.status(200).json({ totalLikes, totalDisikes });
};

export { postReactionFunc, getReactionFunc, getReactionCountFunc };
