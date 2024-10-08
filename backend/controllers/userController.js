import {
  checkUserName,
  deleteUser,
  updateUserName,
} from "../db/queries/userQueries.js";

const updateUserNameFunc = async (req, res) => {
  const userId = req.params.userId;
  const { anonymousName } = req.body;

  try {
    const checkAnonymousNameResult = await checkUserName(anonymousName);
    if (checkAnonymousNameResult) {
      return res.status(401).json({ message: "Name already exists" });
    }
    const result = await updateUserName(anonymousName, userId);

    if (!result) {
      return res.status(404).json({ message: "Name not updated" });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error("Error updating anonymous name:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUserFunc = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await deleteUser(userId);

    if (!result) {
      return res.status(404).json({ message: "User not deleted" });
    }
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { updateUserNameFunc, deleteUserFunc };
