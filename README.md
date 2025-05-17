# 🛒 Collaborative Shopping List App

A real-time collaborative shopping list built with:

- 🖥️ **Frontend**: React + Vite + Tailwind CSS
- ⚙️ **Backend**: Node.js + Express + Socket.IO
- 🧠 **Database**: MongoDB (local) + Mongoose

---

## 📦 Features

- Real-time updates via Socket.IO
- Add products with name and quantity
- Each product is stored in MongoDB
- Display of full product list to all users
- Backend & frontend running independently

---

## 🚀 Project Structure
ListApp/
├── client/ # React + Vite frontend
├── server/ # Express + Socket.io backend
│ ├── models/ # Mongoose schemas
│ ├── index.js # App entry point
│ └── .env # MongoDB connection
└── README.md

---

## 🔧 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/listapp.git
cd listapp

2. Start the backend
cd server
npm install
npm run dev
Make sure MongoDB is running locally (mongodb://localhost:27017/shoppinglist)

3. Start the frontend

cd ../client
npm install
npm run dev

Then open: http://localhost:5173

📌 TODOs
 Add delete/edit buttons

 User authentication

 Host on production

🧠 Author
Made by Edi with ❤️
