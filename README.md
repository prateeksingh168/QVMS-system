# 🔐 QR-Based Visitor Management System (QVMS)

A full-stack system to replace manual visitor registers using QR codes.

## 🚀 Features

- Visitor Registration
- QR Code Generation
- Scan-based Check-in / Check-out (toggle system)
- Real-time Dashboard
- JWT Authentication
- Role-based access (Admin / Security)

## 🧠 Tech Stack

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy

### Frontend
- React (Vite)
- Tailwind CSS
- Recharts

## 🔄 Flow

1. Admin registers visitor
2. QR generated
3. Security scans QR
4. System toggles:
   - Check-in
   - Check-out

## 📊 Dashboard

- Total Visits
- Active Visitors
- Daily Stats
- Recent Activity

## 🔐 Authentication

- JWT-based secure APIs
- Protected routes

## ⚙️ Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Pranav Soni