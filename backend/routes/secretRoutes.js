import express from "express";
import ensureAuthenticated from "../middlewares/authMiddleware.js";
import {
  deleteSecretFunc,
  getSecretsByOrderFunc,
  getUserSecretsFunc,
  postSecretFunc,
} from "../controllers/secretController.js";

const router = express.Router();

// POST /secret/post/:userId
router.post("/post/:userId", ensureAuthenticated, postSecretFunc);

// GET /secret/get/:userId
router.get("/get/:userId", ensureAuthenticated, getUserSecretsFunc);

// GET /secret/get-posts/:order
router.get("/get-posts/:order", ensureAuthenticated, getSecretsByOrderFunc);

// DELETE /secret/get-posts/:postId
router.delete("/get-posts/:postId", ensureAuthenticated, deleteSecretFunc);

export default router;
