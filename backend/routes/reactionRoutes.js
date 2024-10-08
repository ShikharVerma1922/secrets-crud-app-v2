import express from "express";
import {
  getReactionCountFunc,
  getReactionFunc,
  postReactionFunc,
} from "../controllers/reactionController.js";
import ensureAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /reaction/post/:postId
router.post("/post/:postId", ensureAuthenticated, postReactionFunc);

// GET /reaction/get/:postId/:userId
router.get("/get/:postId/:userId", ensureAuthenticated, getReactionFunc);

// GET /reaction/get-count/:postId
router.get("/get-count/:postId", ensureAuthenticated, getReactionCountFunc);

export default router;
