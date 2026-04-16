# 🚀 Pinterest Clone App – Full Stack Social Platform

![Website Preview](https://res.cloudinary.com/dgagbheuj/image/upload/v1774326142/tar7aojmlsuup8hmuntl.png)

A **scalable full-stack social platform backend** inspired by Pinterest and built with a **production-grade architecture similar to HireHub Freelance Platform**.

Built using **NestJS, MongoDB, Redis, and Socket.IO**, this system supports real-time communication, social interactions, and advanced content management at scale.

---

## 🧠 Overview

This is a **production-ready backend system** for a modern social platform where users can:

- Share and explore visual content (Pins)
- Interact via likes, comments, and follows
- Communicate through real-time chat
- Receive instant notifications
- Manage content through admin controls

---

## ⚙️ Tech Stack

- **Backend Framework:** NestJS (Modular Architecture)
- **Database:** MongoDB (Mongoose)
- **Caching:** Redis
- **Realtime Engine:** Socket.IO
- **Authentication:** JWT
- **File Storage:** Cloudinary
- **Security:** bcrypt
- **Validation:** class-validator

---

## 🔐 Authentication & Roles

Role-based access control system:

- `USER`
- `ADMIN`

### Features

- Secure JWT authentication
- Protected routes using Guards
- Role-based authorization
- Session-safe access control

---

## 📦 Core Features

### 👤 User System

- User registration & login
- Profile management (avatar, bio, info)
- Follow / Unfollow system
- Admin user moderation

---

### 📌 Pins (Content System)

- Create / Update / Delete pins
- Image uploads via Cloudinary
- Explore feed system
- Pin detail page with interactions

---

### 💬 Comments & Replies

- Add comments on pins
- Nested replies system
- Edit & delete comments
- Real-time comment updates

---

### ❤️ Likes & Social Interaction

- Like / Unlike pins
- Track engagement metrics
- User interaction system

---

### 💬 Real-Time Chat

- One-to-one messaging system
- Socket.IO real-time communication
- Online users tracking
- Typing indicators
- Message status (seen / delivered)

---

### 🔔 Notifications System

- Real-time notifications (Redis + Socket.IO)
- Events:
  - Likes
  - Comments
  - Follows

- Features:
  - Mark as read / unread
  - Instant delivery
  - Multi-device sync

---

### 🛠 Admin Dashboard

- Manage users
- Delete inappropriate content
- Moderate pins & comments
- System control panel

---

## ⚡ Real-Time Architecture

### 💬 Chat Gateway

- Live messaging system
- Typing indicators
- Online/offline presence
- Message status tracking

### 🔔 Notification Gateway

- Event-driven architecture
- Instant push notifications
- Redis-based performance optimization
- Multi-client synchronization

---

## 📂 Project Structure 

#### BackEnd
```
backend/
│
├── controllers/   # Handle incoming requests (routes layer)
├── guards/        # Auth & role protection
├── modules/       # Feature modules (Auth, Users, Projects, etc.)
├── schemas/       # Database models (MongoDB / Mongoose)
├── services/      # Business logic layer
├── libs/          # Shared utilities & helpers
├── token/         # JWT & authentication utilities
├── gateways/      # WebSocket (real-time features)
└── main.ts        # Application entry point
```

#### FrontEnd
```
frontend/
│
└── src/
    │
    ├── apis/         # API layer  fetch requests - backend communication)
    │
    ├── components/   # Reusable UI components (buttons, cards, inputs, etc.)
    │
    ├── libs/         # Shared utilities & helpers
    │
    ├── routes/       # Routing configuration (React Router / Next routing logic / Protected Router)
    │
    ├── services/     # Business logic layer (API orchestration, feature services)
    │
    ├── socket/       # WebSocket / Socket.io client setup & events
    │
    ├── stores/       # Global state management (Zustand)
    │
    ├── types/        # TypeScript types & interfaces
    │
    └── page.tsx       # Root application entry point
```
---

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=8080

DATABASE_URL=your_mongodb_uri
ADMIN_EMAIL=admin_email_account
ADMIN_PASSWORD=admin_password_account
JWT_SECRET=your_secret
JWT_EXPIRES_IN=20d

CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

REDIS_URL=your_redis_url

```
---
## 🚀 Getting Started

### 1. Clone the repository


```bash
git clone https://github.com/ZenZN99/Pinterest-Clone-Application
cd Pinterest-Clone-Application
```

## BackEnd
```bash
cd backend
npm install
npm run start:dev
```

## FrontEnd
```bash
cd frontend
npm install
npm run dev
```

---
## 🧪 Testing

This project was tested using **Postman** and manual testing to ensure full system reliability.

---

### 🔹 Tools Used

- Postman (API testing)
- Socket.IO Client (Real-time testing)
- MongoDB Compass (Database verification)

---

### 🔹 Tested Features

- Authentication flow (JWT)
- Pins CRUD operations
- Comments & replies system
- Likes & follow system
- Real-time chat functionality
- Notifications system
- Admin moderation tools

---

### 🔹 WebSocket Testing

- Live messaging
- Typing indicators
- Online/offline users tracking
- Real-time notifications delivery

---
## 🚀 Future Improvements
- 🔍 Advanced search & filtering system
- 📊 Analytics dashboard
- 🤖 AI-based content recommendations
- 📁 CDN optimization for media uploads
- 🌍 Multi-language support
- ⚡ Performance caching improvements (Redis scaling)
---
## 📌 Notes
Built with scalable NestJS modular architecture (HireHub-style)
Redis optimized for performance
Fully real-time system using WebSockets
Production-ready backend design
👨‍💻 Author

Built by: Full-Stack Backend Engineer
Focused on scalable, production-grade backend systems using modern architectures.

⭐ Support

If you like this project, give it a ⭐ on GitHub!
