import mongoose from "mongoose";

const moodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   // link to user
      required: false, // Changed to false temporarily since auth is in progress
    },
    emoji: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      required: true, 
    },
    note: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Mood", moodSchema);