import express from "express";
import ensureAuthenticated from "../middlewares/authMiddleware.js";
import {
  deleteCommentFunc,
  getCommentCountFunc,
  getCommentsFunc,
  postCommentFunc,
} from "../controllers/commentController.js";

const router = express.Router();

// POST /comment/post/:postId
router.post("/post/:postId", ensureAuthenticated, postCommentFunc);

// GET /comment/get/:postId
router.get("/get/:postId", ensureAuthenticated, getCommentsFunc);

// GET /comment/get-count/:postId
router.get("/get-count/:postId", ensureAuthenticated, getCommentCountFunc);

// DELETE /comment/delete/:commentId
router.delete("/delete/:commentId", ensureAuthenticated, deleteCommentFunc);

export default router;
