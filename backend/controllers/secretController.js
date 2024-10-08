import {
  deleteSecret,
  getRecentSecrets,
  getTopSecrets,
  getUserSecrets,
  postSecret,
} from "../db/queries/secretQueries.js";

// Post user's secret post
const postSecretFunc = async (req, res) => {
  const { userId } = req.params;
  const { content } = req.body;

  try {
    await postSecret(userId, content);
    res.status(200).json({ message: "Posted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user's secrets
const getUserSecretsFunc = async (req, res) => {
  const userId = req.params.userId;

  try {
    const secrets = await getUserSecrets(userId);
    if (!secrets) {
      return res.status(404).json({ message: "No secrets found" });
    }
    res.status(200).json(secrets); // Send the posts as JSON
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const getSecretsByOrderFunc = async (req, res) => {
  const order = req.params.order;
  let secrets;

  try {
    if (order === "recent") {
      secrets = await getRecentSecrets();
    } else {
      secrets = await getTopSecrets();
    }
    if (!secrets) {
      return res.status(404).json({ message: "No secrets found" });
    }
    res.status(200).json(secrets);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

// Delete user's secret post
const deleteSecretFunc = async (req, res) => {
  const { postId } = req.params;

  try {
    const deletedPost = await deleteSecret(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not deleted" });
    }
    res.status(200).json({ message: "Secret deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  postSecretFunc,
  getUserSecretsFunc,
  getSecretsByOrderFunc,
  deleteSecretFunc,
};
