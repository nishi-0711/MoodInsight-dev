import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import moodRoutes from "./routes/moodRoutes.js";
import authRoutes from "./routes/auth.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin : '*',
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use("/api/moods", moodRoutes);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});