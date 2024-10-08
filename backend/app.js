import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import secretRoutes from "./routes/secretRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import reactionRoutes from "./routes/reactionRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://secrets-crud-app-ui.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/secret", secretRoutes);
app.use("/comment", commentRoutes);
app.use("/bookmark", bookmarkRoutes);
app.use("/reaction", reactionRoutes);

app.get("/ping", (req, res) => {
  res.send("pong");
});
export default app;
