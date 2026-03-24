# 🚀 Pinterest Clone App – Full Stack Social Platform

![Website Preview](https://res.cloudinary.com/dgagbheuj/image/upload/v1774326142/tar7aojmlsuup8hmuntl.png)

---

## 🚀 Project Overview

**Pinterest Clone App** is a full-stack social platform inspired by Pinterest, built to allow users to share ideas, discover content, and interact through real-time features.

This project includes authentication, pin management, comments & replies, real-time chat, notifications, and a powerful admin dashboard.

---

## 🧩 Features

### 🔐 Authentication & Users

- Secure login & registration using JWT
- Protected routes and role-based access
- User profiles with avatar, bio, and info

---

### 📌 Pins (Posts)

- Create, edit, delete pins
- Upload images and descriptions
- View pin details page
- Explore content from other users

---

### 💬 Comments & Replies

- Add comments on pins
- Reply to comments (nested system)
- Edit & delete comments/replies
- Real-time updates after actions

---

### 💬 Real-Time Chat

- One-to-one messaging between users
- Live message updates using Socket.io
- Online users indicator
- Smooth real-time experience

---

### 🔔 Notifications System

- Instant notifications for:
  - Comments
  - Replies
  - Interactions
- Mark as read / unread
- Real-time updates

---

### ❤️ Social Features

- Follow / Unfollow users
- Like and interact with content
- Personalized experience

---

### 🛠 Admin Dashboard

- Manage users, pins, comments
- Delete inappropriate content
- Control system activity
- Full moderation tools

---

## 🛠 Tech Stack

**Backend:**

- Bun.js / NestJS
- MongoDB + Redis
- JWT Authentication
- Socket.io (Realtime)
- Redis (optional caching)

**Frontend:**

- React (Vite / Next.js)
- TypeScript
- Tailwind CSS
- Zustand (State Management)

---

## 💻 Installation & Setup

### Prerequisites

- Node.js
- MongoDB
- Git

---

## 🧠 Architecture

- Clean Architecture (Backend)
- Modular structure (NestJS)
- Centralized state (Zustand)
- Event-driven system (Socket.io)


### 1. Clone the repository

```bash
git clone https://github.com/ZenZN99/Pinterest-Clone-App.git
cd Pinterest-Clone-App
2. Install dependencies
Frontend
cd frontend
npm install
Backend
cd backend
npm install
3. Environment Variables

Create .env file in backend:

.env.example file

4. Run the project
Backend
npm run start:dev
Frontend
npm run dev
5. Open the app
http://localhost:3000
📂 Project Structure
frontend/
 ├─ components/
 ├─ hooks/
 ├─ pages/
 ├─ stores/
 └─ services/

 backend/
 ├─ modules/
 ├─ schemas/
 ├─ services/
 ├─ controllers/
 └─ gateways/
🚀 Key Highlights
⚡ Real-time communication (Chat + Notifications)
🧠 Clean and scalable architecture
🎯 Role-based system (User / Admin)
📱 Fully responsive design
🔥 Production-ready structure
🔮 Future Improvements
🔍 Advanced search & filtering
📊 Analytics dashboard
🤖 AI-powered recommendations
📁 Media uploads optimization (CDN)
🌍 Multi-language support
⚡ Performance optimization & caching
👨‍💻 Author

Zen – Full Stack Developer

⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

📜 License

This project is licensed under the MIT License © 2026
```
