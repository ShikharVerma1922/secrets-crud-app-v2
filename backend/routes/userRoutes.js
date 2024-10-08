import express from "express";
import {
  deleteUserFunc,
  updateUserNameFunc,
} from "../controllers/userController.js";
import ensureAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

// PUT /user/put/:userId
router.put("/put/:userId", ensureAuthenticated, updateUserNameFunc);

// DELETE /user/delete/:userId
router.delete("/delete/:userId", ensureAuthenticated, deleteUserFunc);

export default router;
