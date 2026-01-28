# Pastebin Lite

A simple Pastebin-like web application that allows users to create text pastes and share them via a unique URL.
Pastes can optionally expire based on **time (TTL)** or **maximum view count**.

This project is built as part of a take-home assignment and is designed to pass automated backend tests.

---

## 🚀 Features

- Create a text paste
- Generate a shareable link
- View paste content via the link
- Optional expiration:
  - Time-based (TTL)
  - View-count limit
- Paste becomes unavailable when **either condition is met**
- Responsive UI (mobile, tablet, desktop)

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- JavaScript
- React Router DOM

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose

---

## 🗄️ Persistence Layer

**MongoDB Atlas** (cloud-hosted NoSQL database) is used to persist pastes across requests.
This ensures data durability and compatibility with serverless deployments.

---

## 🔗 API Routes

### Health Check
```
GET /api/healthz
```
Response:
```json
{ "ok": true }
```

---

### Create Paste
```
POST /api/pastes
```

Request body:
```json
{
  "content": "string",
  "ttl_seconds": 60,
  "max_views": 5
}
```

Response:
```json
{
  "id": "string",
  "url": "https://your-domain/p/<id>"
}
```

---

### Fetch Paste (API)
```
GET /api/pastes/:id
```

Response:
```json
{
  "content": "string",
  "remaining_views": 4,
  "expires_at": "2026-01-01T00:00:00.000Z"
}
```

Each successful API fetch counts as one view.

---

### View Paste (HTML)
```
GET /p/:id
```

Returns an HTML page rendering the paste content safely.

---

## 🧪 Deterministic Time Testing

If the environment variable below is set:
```
TEST_MODE=1
```

The backend uses the request header:
```
x-test-now-ms
```

as the current time for TTL calculations.

---

## ▶️ Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/pastebin_lite
BASE_URL=http://localhost:5000
TEST_MODE=0
```

---

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Create `.env` (optional):
```env
VITE_API_BASE=http://localhost:5000
```

---

## 📦 Deployment

- Backend can be deployed on Render / Railway / similar platforms
- Frontend can be deployed on Vercel
- MongoDB Atlas is used as the production database

---

## ✅ Notes & Design Decisions

- API requests are used to enforce view limits
- HTML route does not increment view count
- React 18 is used for stability and compatibility
- UI is kept minimal as design is not heavily graded

---
