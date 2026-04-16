# 🚀 Pinterest Clone App –  Full Stack Social Platform

![Website Preview](https://res.cloudinary.com/dgagbheuj/image/upload/v1774326142/tar7aojmlsuup8hmuntl.png)

A powerful **Full-Stack Social Platform API** inspired by Pinterest and built with a scalable production-ready architecture similar to **HireHub Freelance Platform**.

Built using **NestJS / Backend Modular Architecture, MongoDB, Redis, and Socket.IO**, this system supports real-time communication, social interactions, and advanced content management.

---

## 🧠 Overview

This project is a **production-ready social platform backend** where users can:

- Share and explore visual content (Pins)
- Interact via comments, likes, and follows
- Chat in real-time
- Receive instant notifications
- Manage content through an admin system

---

## ⚙️ Tech Stack

- **Framework:** NestJS (Modular Architecture)
- **Database:** MongoDB (Mongoose)
- **Caching:** Redis
- **Realtime:** Socket.IO
- **Authentication:** JWT
- **File Uploads:** Cloudinary
- **Security:** bcrypt
- **Validation:** class-validator

---

## 🔐 Authentication & Roles

The system supports role-based access control:

- `USER`
- `ADMIN`

### Features:

- Secure JWT authentication
- Protected routes with Guards
- Role-based access control

---

## 📦 Core Features

### 👤 User System

- User registration & login
- Profile management (avatar, bio)
- Follow / Unfollow system
- Admin user control

---

### 📌 Pins (Content System)

- Create, update, delete pins
- Upload images (Cloudinary)
- Explore feed system
- Pin detail page

---

### 💬 Comments & Replies

- Comment on pins
- Nested replies system
- Edit & delete comments
- Real-time comment updates

---

### ❤️ Likes & Social Interaction

- Like / Unlike pins
- Track engagement
- User interaction system

---

### 💬 Real-Time Chat

- One-to-one messaging
- Socket.IO powered communication
- Online user status
- Typing indicator

---

### 🔔 Notifications System

- Real-time notifications (Redis + Socket.IO)
- Events:
  - Likes
  - Comments
  - Follows
- Mark as read / unread
- Instant delivery

---

### 🛠 Admin Dashboard

- Manage users
- Delete pins and comments
- Moderate platform content
- Control system activity

---

## ⚡ Real-Time Features

### 💬 Chat Gateway

- Live messaging
- Typing indicators
- Online users tracking
- Message status (read/unread)

### 🔔 Notification Gateway

- Instant event broadcasting
- Multi-device sync
- Redis-powered caching

---

## 📂 Project Structure (HireHub Style Architecture)

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
npm instal
npm run dev
```

---
## 🧪 Testing

This project was tested using Postman and manual testing to ensure full system reliability.

## 🔹Tools Used
Postman (API testing)
Socket.IO Client (Realtime testing)
MongoDB Compass (Database verification)
## 🔹 Tested Features
Authentication flow (JWT)
Pins CRUD operations
Comments & replies system
Likes & follow system
Real-time chat functionality
Notifications system
Admin moderation tools
## 🔹 WebSocket Testing
Live messaging
Typing indicators
Online/offline users
Real-time notifications
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
