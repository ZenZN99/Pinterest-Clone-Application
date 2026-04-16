# 🚀 Pinterest Clone App – HireHub Style Full Stack Social Platform

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
