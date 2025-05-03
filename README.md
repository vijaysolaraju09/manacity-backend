# Manacity Backend

This is the backend for the Manacity app — a local business and community app.

## 🚀 Tech Stack

- Node.js
- Express
- MongoDB (using Mongoose)
- Firebase (handled client-side)

## 🔐 Authentication

- OTP login via Firebase (frontend handles it)
- Role-based (user, business, admin)

## 📦 Features

- User and Business profiles
- Product CRUD
- Tournament registration
- Verified users directory
- Order interest + history
- News section

## 🛠️ Setup Instructions

1. Clone the project
2. Go to `backend/`
3. Create a `.env` file with:

```env
MONGO_URI=your_mongo_connection_string
PORT=5000
```
