//import axios from "axios";
//
//const API = axios.create({
//  baseURL: "http://10.0.2.2:5000/api/moods",
//});
//
//// ➕ Add Mood
//export const addMood = (data) => API.post("/add", data);
//
//// 📊 Get Moods
//export const getMoods = (userId) => API.get(`/${userId}`);


import axios from "axios";

// USE YOUR LOCAL IP ADDRESS HERE
const BASE_URL = "http://192.168.x.x:5000/api/moods";

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
});

export const addMood = (data) => API.post("/add", data);
export const getMoods = (userId) => API.get(`/${userId}`);