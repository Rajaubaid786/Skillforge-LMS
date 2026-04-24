# 🎓 SkillForge Learning — MERN Stack LMS

> A full-featured Learning Management System built with the **MERN Stack**, featuring role-based access for Admins, Instructors, and Students.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

---

## 📖 Project Overview

**SkillForge Learning** is a comprehensive LMS platform where Admins manage the platform, Instructors create and manage courses with lessons, and Students browse, enroll, and track their learning progress — all secured with JWT-based authentication and role-based authorization.

---

## ✨ Key Features

### 👑 Admin Portal
- Real-time dashboard with user & course analytics
- View and delete all registered users
- Full platform oversight and control

### 👨‍🏫 Instructor Panel
- Create, update, and delete courses
- Upload lessons with titles and detailed content
- View students enrolled in their courses

### 👨‍🎓 Student Portal
- Browse and search available courses
- One-click course enrollment
- Track learning progress with dynamic progress bars
- Manage personal profile and account

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, React Router, Axios, CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Auth** | JWT (JSON Web Token), Bcrypt.js |
| **Config** | Dotenv |

---

## 📁 Project Structure

```
skillforge-lms/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Enrollment.js
│   ├── routes/
│   ├── seed.js
│   ├── server.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── routes/
    └── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/skillforge-lms.git
cd skillforge-lms
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-lms
JWT_SECRET=your_super_secret_key
```

Start the backend server:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

### 4️⃣ Seed the Database

Populate the database with sample users, courses, and enrollments:

```bash
cd backend
npm run seed
```

---

## 🔑 Login Credentials (After Seeding)

| Role | Email | Password |
|---|---|---|
| 👑 Admin | admin@lms.com | admin123 |
| 👨‍🏫 Instructor | ali@lms.com | instructor123 |
| 👨‍🏫 Instructor | sara@lms.com | instructor123 |
| 👨‍🎓 Student | bilal@lms.com | student123 |
| 👨‍🎓 Student | ayesha@lms.com | student123 |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Courses
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/courses` | Get all courses |
| POST | `/api/courses` | Create a course (Instructor) |
| PUT | `/api/courses/:id` | Update a course (Instructor) |
| DELETE | `/api/courses/:id` | Delete a course (Instructor/Admin) |

### Users
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | Get all users (Admin) |
| DELETE | `/api/users/:id` | Delete a user (Admin) |

### Enrollment
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/enroll` | Enroll in a course (Student) |
| GET | `/api/my-courses` | Get enrolled courses (Student) |

---

## 🗄️ Database Models

### User
```js
{ name, email, password, role: ['Admin', 'Instructor', 'Student'] }
```

### Course
```js
{ title, description, instructor (ref), category, price, seats, lessons: [{ title, content }] }
```

### Enrollment
```js
{ student (ref), course (ref), progress }
```

---

## 📊 Marking Criteria Coverage

| Criteria | Status |
|---|---|
| UI/UX Design | ✅ |
| React Implementation | ✅ |
| Backend API Development | ✅ |
| Database Design | ✅ |
| Authentication & Security | ✅ |
| Role-Based Functionality | ✅ |
| Code Quality & Structure | ✅ |
| Deployment & Testing | ✅ |

---

## 👨‍💻 Developer Info

- **Developer:** Muhammad Ubaid
- **Project Type:** MERN Stack Final Project — Full Stack LMS
- **Course:** MERN Stack Web Development

---

*© 2026 SkillForge Learning — Built with ❤️ by Muhammad Ubaid*
