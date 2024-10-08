// routes/authRoutes.js
import express from "express";
import { signup, login } from "../controllers/authController.js";
import {
  loginValidation,
  signupValidation,
} from "../middlewares/authValidation.js";

const router = express.Router();

// POST /auth/signup
router.post("/signup", signupValidation, signup);

// POST /auth/login
router.post("/login", loginValidation, login);

export default router;
