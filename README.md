# MoodInsight

# 🌙 MoodInsight – Daily Mood Journal with Pattern Insights

---

## Table of Contents

* [Project Overview](#project-overview)
* [Problem Statement & Relevance](#problem-statement--relevance)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Setup & Installation](#setup--installation)
* [Usage](#usage)
* [Current Status](#current-status)
* [Challenges Faced](#challenges-faced)
* [Next Steps](#next-steps)
* [License](#license)

---

## Project Overview

**MoodInsight** is an insight-driven mood journaling app designed to help users track and reflect on their emotional well-being. By logging daily moods and notes, users can identify patterns and trends over time, gaining actionable insights into their mental health.

---

## Problem Statement & Relevance

* People often neglect their emotional health due to busy lifestyles.
* Existing mood tracking apps rarely provide insights or actionable patterns.

**Solution:**

* Track daily moods with notes
* Maintain a recent history of mood entries
* Analyze mood trends for emotional awareness

---

## Features

* **Login Page:** UI ready; login button under deployment
* **Mood Logging:** Users select mood and add notes
* **Recent History:** Shows previous moods (integration pending login)
* **Backend APIs:** REST endpoints for mood creation and retrieval
* **Insight Generation (Future):** Visualize mood trends and analytics

---

## Tech Stack

| Layer      | Technology               |
| ---------- | ------------------------ |
| Frontend   | React Native (Expo)      |
| Backend    | Node.js, Express.js      |
| Database   | MongoDB (NoSQL)          |
| State Mgmt | React Native state/hooks |
| API Calls  | Axios / Fetch API        |

---

## Architecture

**Flow Diagram:**

```
+----------------+       +----------------+       +------------------+       +----------------+
|  React Native  | ----> |   Express.js    | ----> |   MongoDB Atlas  | ----> |  Response to    |
|     Client     |       |   Backend API   |       |  (Users, Moods) |       |   Frontend      |
+----------------+       +----------------+       +------------------+       +----------------+
```

* Frontend handles UI and user interactions
* Backend handles APIs and business logic
* MongoDB stores users and mood data

---

## Setup & Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd MoodInsight
```

2. **Backend Setup**

```bash
cd backend
npm install
# Create .env file:
# MONGO_URI=<your-mongodb-uri>
npm run dev
```

3. **Frontend Setup**

```bash
cd frontend
npm install
expo start
```

4. **Database**

* MongoDB Atlas
* Collections: `users`, `moods`

---

## Usage

1. Open app on a mobile simulator or device.
2. **Login Page:** UI ready; button under deployment.
3. Access **Mood Logging** screen (simulate login if needed):

   * Select mood
   * Add note
   * Submit
4. View **Recent History** once login integration is complete.
5. Future analytics will visualize mood trends.

---

## Current Status

| Feature        | Status                                      |
| -------------- | ------------------------------------------- |
| Login Page UI  | Completed (button under deployment)         |
| Mood Logging   | Completed ✅                                 |
| Recent History | Backend ready; frontend pending integration |
| Backend APIs   | Completed ✅                                 |
| Mood Analytics | Planned                                     |

---

## Challenges Faced

* MongoDB cluster setup and connection
* API integration with frontend
* Login feature under deployment
* Managing environment variables and state

---

## Next Steps

* Deploy login functionality
* Integrate Recent History with live user data
* Add mood analytics and visualizations
* Improve UI/UX and deploy the app

---

## License

This project is licensed under the MIT License.
