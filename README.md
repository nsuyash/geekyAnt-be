# 🛠 Engineering Resource Management System - Backend

This is the backend service for the _Engineering Resource Management System, built using **Node.js, **Express, and \*\*MongoDB_.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [Environment Variables](#environment-variables)

---

## ✅ Features

- User authentication with JWT
- Engineer profile management
- Project creation and deletion
- Assignment management
- MongoDB integration with Mongoose

---

## 🛠 Tech Stack

- _Node.js_
- _Express_
- _MongoDB + Mongoose_
- _JWT Authentication_
- _dotenv_
- _bcryptjs_

---

## 📌 API Endpoints

### 🛂 Auth

| Method | Endpoint              | Description                  |
| ------ | --------------------- | ---------------------------- |
| POST   | /auth/login           | Log in user                  |
| GET    | /auth/profile         | Get logged-in user's profile |
| PUT    | /auth/profile/:userId | Update user profile          |

### 👩‍💻 Engineers

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| GET    | /engineers/ | Get all engineers |

### 📁 Projects

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| GET    | /projects            | Get all projects     |
| POST   | /projects/           | Create a new project |
| DELETE | /projects/:projectId | Delete a project     |

### 📌 Assignments

| Method | Endpoint      | Description             |
| ------ | ------------- | ----------------------- |
| GET    | /assignments/ | Get all assignments     |
| POST   | /assignments  | Create a new assignment |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm
- MongoDB (local or cloud instance)

---

### 🔧 Setup

1. _Clone the repository_

   ```bash
   git clone <your-repo-url>
   cd engineering-resource-management-backend
   ```
