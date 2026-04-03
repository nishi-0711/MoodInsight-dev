import API from './api';

// ➕ Add Mood
// The backend will now identify the user from the JWT token in the header
export const addMood = (data) => API.post("/moods/add", data);

// 📊 Get Moods
// We can now just call /moods since the token identifies the user
export const getMoods = () => API.get("/moods/me");
