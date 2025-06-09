# Engineering Resource Management System ⚙️

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing engineers, projects, and assignments within an organization.

## ✨ Features

* User Registration & Authentication (JWT-based)
* Role-based Authorization (Manager / Engineer)
* Engineer Capacity Tracking
* Project Management
* Assignment Management (Create / Update / Delete)
* Engineer Profile Management

---

## 📦 API Routes

### 🛂 **Auth**

| Method | Endpoint                | Description                                | Access        |
| ------ | ----------------------- | ------------------------------------------ | ------------- |
| POST   | `/api/auth/register`    | Register a new user                        | Public        |
| POST   | `/api/auth/login`       | Log in user and receive JWT token          | Public        |
| GET    | `/api/auth/profile`     | Get logged-in user's profile               | Authenticated |
| PUT    | `/api/auth/profile/:id` | Update user profile (`engineer`/`manager`) | Authenticated |

### 👨‍💻 **Engineers**

| Method | Endpoint                      | Description                             | Access        |
| ------ | ----------------------------- | --------------------------------------- | ------------- |
| GET    | `/api/engineers/`             | Get all engineers with capacity details | Authenticated |
| GET    | `/api/engineers/:id/capacity` | Get specific engineer's capacity        | Manager       |

### 📁 **Projects**

| Method | Endpoint            | Description               | Access        |
| ------ | ------------------- | ------------------------- | ------------- |
| GET    | `/api/projects/`    | Get all projects          | Authenticated |
| POST   | `/api/projects/`    | Create a new project      | Manager       |
| GET    | `/api/projects/:id` | Get project details by ID | Authenticated |
| DELETE | `/api/projects/:id` | Delete a project          | Manager       |

### 📋 **Assignments**

| Method | Endpoint               | Description             | Access        |
| ------ | ---------------------- | ----------------------- | ------------- |
| GET    | `/api/assignments/`    | Get all assignments     | Authenticated |
| POST   | `/api/assignments/`    | Create a new assignment | Manager       |
| PUT    | `/api/assignments/:id` | Update an assignment    | Authenticated |
| DELETE | `/api/assignments/:id` | Delete an assignment    | Manager       |

---

## ⚙️ Tech Stack

* **Backend:** Node.js, Express.js, MongoDB, Mongoose
* **Frontend:** React.js, React Router DOM, Bootstrap
* **Authentication:** JWT, Bcrypt.js
* **Role-based Access:** Custom Middleware
* **Deployment:** Vercel (Frontend), Render / Railway / Localhost (Backend)

---

## 🚀 Setup Instructions

### 1️⃣ Backend Setup

```bash
git clone https://github.com/nsuyash/geekyAnt-be/blob/main/routes/projects.js
cd backend
npm install
```

Create a `.env` file in your `backend/` directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_base_url
JWT_SECRET=your_secret_key
```

Run the server:

```bash
npm start
```

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 📌 Sample API Usage

### Base URL (Local Development)

```js
const API_BASE = "http://localhost:3000/api";
```

### Login Example

```js
export const loginUser = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};
```

---

## 👩‍🏫 Roles

* `manager`: Can create / manage projects and assignments; view engineer capacity.
* `engineer`: Can view own profile, update profile; view own assignments.

---

## 📝 Notes

✅ Role-based access is implemented via `authMiddleware`.
✅ Engineer capacity is dynamically calculated based on existing assignments.
✅ Projects and Assignments support full CRUD for `manager` users.
