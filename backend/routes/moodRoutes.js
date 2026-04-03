import express from "express";
import Mood from "../models/Mood.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ➕ Add Mood Entry (Protected)
router.post("/add", auth, async (req, res) => {
  try {
    const { emoji, mood, note } = req.body;
    const userId = req.user.id; // From auth middleware

    const newMood = new Mood({ userId, emoji, mood, note });
    await newMood.save();

    res.status(201).json(newMood);
  } catch (error) {
    console.error("Error saving mood:", error);
    res.status(500).json({ message: "Error saving mood" });
  }
});

// 📥 Get Private Moods for Logged In User
router.get("/me", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const moods = await Mood.find({ userId }).sort({ createdAt: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching moods" });
  }
});

// 📥 Get All Moods (Legacy/Public - optional)
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const query = userId === "all" ? {} : { userId };
    const moods = await Mood.find(query).sort({ createdAt: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching moods" });
  }
});

// 🗑️ Delete Mood (Protected)
router.delete("/:id", auth, async (req, res) => {
    try {
        const mood = await Mood.findById(req.params.id);
        if (!mood) return res.status(404).json({ message: "Mood not found" });

        // Ensure user owns the mood
        if (mood.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await mood.deleteOne();
        res.json({ message: "Mood deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting mood" });
    }
});

export default router;
