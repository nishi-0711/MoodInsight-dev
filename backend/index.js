
import authRoutes from './routes/auth.js';
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: "OK" });
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});


app.use(express.json()); // 🔥 important
app.use('/api/auth', authRoutes);

let moods = []; // temporary storage

app.post('/api/mood', (req, res) => {
  const { mood, note } = req.body;

  const newMood = {
    _id: Date.now().toString(),
    mood,
    note
  };

  moods.push(newMood);

  res.json(newMood);
});

app.get('/api/mood', (req, res) => {
  res.json(moods);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});