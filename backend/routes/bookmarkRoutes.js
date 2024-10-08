import express from "express";
import {
  deleteBookmarkFunc,
  getBookmarkCountFunc,
  getBookmarksFunc,
  getUserBookmarksFunc,
  postBookmarkFunc,
} from "../controllers/bookmarkController.js";
import ensureAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /bookmark/post/:postId
router.post("/post/:postId", ensureAuthenticated, postBookmarkFunc);

// GET /bookmark/get/:postId/:userId
router.get("/get/:postId/:userId", ensureAuthenticated, getBookmarksFunc);

// GET /bookmark/get-bookmarks/:userId
router.get("/get-bookmarks/:userId", ensureAuthenticated, getUserBookmarksFunc);

// GET /bookmark/get-count/:postId
router.get("/get-count/:postId", ensureAuthenticated, getBookmarkCountFunc);

// DELETE /bookmark/delete/:postId/:userId
router.delete(
  "/delete/:postId/:userId",
  ensureAuthenticated,
  deleteBookmarkFunc
);

export default router;
