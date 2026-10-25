# TetraFlow 🧩🎮

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Apache Cordova](https://img.shields.io/badge/Apache_Cordova-E8E8E8?style=for-the-badge&logo=apachecordova&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

**TetraFlow** is a modern, motion-enhanced Tetris-inspired game built for mobile devices. Developed as part of the **Coding Academy** program at **WIFI Oberösterreich**, it combines classic gameplay mechanics with mobile sensor controls and online scoring.

---

## ✨ Features

- 🕹️ **Gyroscope Control:** Move and steer falling blocks naturally using your device's physical orientation sensors.
- 🏆 **Global Leaderboard:** Track and sync high scores in real time powered by a **Supabase** backend.
- 📈 **Original Level Logic:** Authentic level progression and speed scaling faithful to traditional gameplay.
- 🔊 **Sound & Audio Integration:** Dedicated audio engine for dynamic sound effects and background music.

---

## 🛠️ Tech Stack

- **Frontend & Core Logic:** JavaScript (ES6+), React/Component Architecture, HTML5 Canvas
- **Mobile Integration:** Apache Cordova (Device APIs & Gyroscope integration)
- **Backend & Database:** Supabase
- **Audio:** Web Audio API / Custom Sound Engine

---

## 📂 Project Structure

```text
TetraFlow/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── ...
└── source/
    ├── backend/       # Supabase client and API services
    ├── components/    # UI and game render components
    ├── contexts/      # React contexts (Game state, User settings)
    ├── hooks/         # Custom hooks (Gyroscope listeners, Timers)
    ├── sound/         # Audio manager and sound assets
    ├── utils/         # Tetris game logic, collision detection & helpers
    ├── App.js         # Main application container
    └── index.js       # Entry point
