import {
  deleteBookmark,
  getBookmarkCount,
  getBookmarks,
  getUserBookmarks,
  postBookmark,
} from "../db/queries/bookmarkQueries.js";

const postBookmarkFunc = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const result = await postBookmark(postId, userId);
    if (!result) {
      return res.status(404).json({ message: "Bookmark unsuccessful" });
    }
    res.status(200).json({
      message: "Bookmarked successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBookmarksFunc = async (req, res) => {
  const { postId, userId } = req.params;

  try {
    const bookmarks = await getBookmarks(postId, userId);
    if (!bookmarks) {
      return res.status(404).json({
        message: "No bookmarks found",
      });
    }
    res.status(200).json({ isBookmarked: bookmarks.length > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserBookmarksFunc = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookmarks = await getUserBookmarks(userId);
    if (!bookmarks) {
      return res.status(404).json({ message: "No bookmarks found" });
    }
    res.status(200).json(bookmarks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBookmarkCountFunc = async (req, res) => {
  const { postId } = req.params;

  try {
    const totalBookmarkCount = await getBookmarkCount(postId);

    if (!totalBookmarkCount) {
      return res.status(404).json({ message: "Post not found" });
    }

    const totalBookmarks = parseInt(totalBookmarkCount.total_bookmarks, 10);
    res.status(200).json({ totalBookmarks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteBookmarkFunc = async (req, res) => {
  const { postId, userId } = req.params;

  try {
    const result = await deleteBookmark(postId, userId);

    if (!result) {
      return res.status(404).json({ message: "Bookmark not removed" });
    }

    res.status(200).json({ message: "Bookmark removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  postBookmarkFunc,
  getBookmarkCountFunc,
  getBookmarksFunc,
  deleteBookmarkFunc,
  getUserBookmarksFunc,
};
