# Portfolio Platform — Dev Setup Guide

## Prerequisites
- Node.js v25
- MongoDB (local or Atlas)
- Cloudinary account
- Gmail account (for Nodemailer)

---

## 1. Backend Setup (`/backend`)

```bash
cd backend
# Copy the .env and fill in your values
# MONGO_URI, JWT_SECRET, CLOUDINARY_*, EMAIL_*
npm run dev
```

### Seed the Admin User (first time only)
```bash
npm run seed
# Creates admin / admin@123  — CHANGE PASSWORD AFTER LOGIN
```

---

## 2. Frontend Setup (`/frontend`)

```bash
cd frontend
# Copy the .env and fill in VITE_API_URL (default: http://localhost:5000/api)
npm run dev
```

---

## URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000/api |
| Admin Panel | http://localhost:5173/admin/login |

---

## Environment Variables

### Backend `.env`
| Key | Description |
|-----|-------------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random secret key |
| `CLIENT_URL` | Frontend URL (for CORS) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `EMAIL_USER` | Your Gmail address |
| `EMAIL_PASS` | Gmail App Password |

### Frontend `.env`
| Key | Description |
|-----|-------------|
| `VITE_API_URL` | Backend API URL |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |

---

## Project Structure

```
portfoliom/
├── backend/
│   └── src/
│       ├── config/       # DB connection
│       ├── controllers/  # Auth, Project, Blog, Certificate, Message, Notification
│       ├── middlewares/  # Auth guard, Error handler
│       ├── models/       # Mongoose schemas
│       ├── routes/       # Express routes
│       ├── utils/        # JWT, Email helpers
│       ├── seed.ts       # Admin seeder
│       └── server.ts     # Entry point
└── frontend/
    └── src/
        ├── components/
        │   ├── ui/       # Button, Input, Card (pure Tailwind)
        │   ├── common/   # Navbar, Footer, PublicLayout
        │   └── admin/    # AdminSidebar, AdminLayout
        ├── hooks/        # Custom hooks
        ├── lib/          # Axios instance
        ├── pages/
        │   ├── public/   # Home, Projects, Blogs, Certificates, Contact
        │   └── admin/    # Login, Dashboard, Projects, Blogs, Certs, Messages, Notifications
        ├── services/     # React Query hooks (project, blog, cert, message, notification)
        ├── types/        # TypeScript interfaces
        └── App.tsx       # Router with lazy loading + protected admin routes
```
