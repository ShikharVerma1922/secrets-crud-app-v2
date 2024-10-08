import express from "express";
import { postSecretFunc } from "../controllers/secretController";

const router = express.Router();

// GET /bookmark/post/:userId
router.get("/get/:userId", ensureAuthenticated, postSecretFunc);

export default router;
