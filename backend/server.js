import app from "./app.js";
import dotenv from "dotenv";
import db from "./config/db.js";

dotenv.config();

// Test database connection
db.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the application if the database connection fails
  } else {
    console.log("Database connected:", res.rows[0]);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
