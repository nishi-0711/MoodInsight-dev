import express from "express";
import Mood from "../models/Mood.js";

const router = express.Router();

// ➕ Add Mood Entry
router.post("/add", async (req, res) => {
  try {
    const { userId, emoji, mood, note } = req.body;

    const newMood = new Mood({ userId, emoji, mood, note });
    await newMood.save();

    res.status(201).json(newMood);
  } catch (error) {
    console.error("Error saving mood:", error);
    res.status(500).json({ message: "Error saving mood" });
  }
});

// 📥 Get All Moods (or for a user)
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    let query = {};
    if (userId !== "all") {
        query.userId = userId;
    }

    const moods = await Mood.find(query).sort({ createdAt: -1 });

    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching moods" });
  }
});

// 🗑️ Delete Mood
router.delete("/:id", async (req, res) => {
    try {
        await Mood.findByIdAndDelete(req.params.id);
        res.json({ message: "Mood deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting mood" });
    }
});

export default router;