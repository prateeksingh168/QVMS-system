# 🚀 QR-Based Visitor Management System (QVMS)

A full-stack web application for managing visitors using QR codes — built with **FastAPI + React + Netlify + Railway**.

---

## 📌 Features

* 🔐 **Authentication**

  * User signup & login (JWT based)

* 👤 **Visitor Management**

  * Register visitors
  * Store visitor details

* 📅 **Visit Management**

  * Create visits
  * Track visit status

* 📷 **QR Code System**

  * Generate QR codes for visits
  * Scan QR to mark entry/exit

* 📊 **Dashboard**

  * Total visits
  * Active visits
  * Daily analytics

---

## 🛠 Tech Stack

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL (Railway)
* JWT Authentication

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Deployment

* Backend → Railway
* Frontend → Netlify

---

## 📂 Project Structure

```
QVMS/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── main.py
│   ├── qr_codes/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
```

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # (Windows)
pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment

### 🚀 Backend (Railway)

* Deploy using Railway
* Add environment variables:

  ```
  DATABASE_URL=your_postgres_url
  SECRET_KEY=your_secret
  ALGORITHM=HS256
  ```

---

### 🌍 Frontend (Netlify)

```bash
npm run build
```

* Upload `dist/` folder to Netlify
* Add `_redirects` file:

```
/*    /index.html   200
```

---

## 🔗 Live Demo

* Frontend: https://your-netlify-link.netlify.app
* Backend API: https://your-railway-link

---

## 📸 Screenshots

* Dashboard
* Visitor Form
* QR Code Generation
* Scanner

*(Add images here later)*

---

## 🧠 Future Improvements

* 📷 Camera-based QR scanner
* 📊 Advanced analytics dashboard
* 🏢 Multi-branch support
* 📱 Mobile responsive UI improvements

---

## 👨‍💻 Author

**Prateek**
B.Tech AI & DS Student

---

## ⭐ Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 💡 Contribute

---

## 🧨 Final Note

This project demonstrates a complete **full-stack system with real deployment**, including:

* API development
* Authentication
* Database integration
* Frontend integration
* Cloud deployment

🔥 Built with real-world architecture in mind.
