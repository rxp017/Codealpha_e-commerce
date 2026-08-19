<div align="center">
  <img src="https://placehold.co/800x200/0A0A0C/E8873A?text=ALPHA+KEYS" alt="Alpha Keys Banner">
  <br/>
  
  # Alpha Keys ⌨️✨
  
  **A Premium E-Commerce Experience for Mechanical Keyboard Enthusiasts**
  
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)

</div>

---

## 📖 Overview

**Alpha Keys** is a fully functional, full-stack e-commerce application designed to deliver a visually stunning shopping experience for premium mechanical keyboards, artisan keycaps, and desk accessories. 

Built with the **MERN stack** and powered by **Vite**, the application features a custom dark glassmorphic design system with copper (`#E8873A`) and electric blue (`#4F8CFF`) accents. 

## ✨ Key Features

- 🎨 **Immersive UI/UX:** A bespoke dark glassmorphic design with micro-animations powered by Framer Motion and custom CSS properties.
- 🛒 **Full Cart & Checkout Flow:** Comprehensive product browsing, cart management (with slide-out drawer), address collection, order review, and success screens.
- 🔐 **Authentication:** Secure JWT-based user authentication system with protected routing.
- 📱 **Fully Responsive:** Impeccable rendering across desktop, tablet, and mobile devices.
- 📦 **API Integration:** Robust RESTful API architecture ensuring fast and secure data retrieval via Mongoose and Express.
- 🖼️ **Dynamic Seeding:** Built-in seeder for a populated, production-ready product catalog with high-quality imagery.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React 18 (via Vite)
- **Styling:** Tailwind CSS (Custom Design System)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **State Management:** React Context API

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Configuration:** dotenv

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/rxp017/Codealpha_e-commerce.git
cd Codealpha_e-commerce
```

### 2. Configure Environment Variables

**Backend (`backend/.env`)**
Create an `.env` file in the `backend/` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**Frontend (`frontend/.env`)**
Create an `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies

Install packages for both the server and the client:

```bash
# Terminal 1: Setup Backend
cd backend
npm install

# Terminal 2: Setup Frontend
cd frontend
npm install
```

### 4. Seed the Database

Populate your MongoDB database with the default Alpha Keys catalog:

```bash
cd backend
npm run seed
```

### 5. Run the Application

Start both development servers concurrently:

```bash
# Terminal 1 (Backend)
cd backend
npm run dev

# Terminal 2 (Frontend)
cd frontend
npm run dev
```

Visit **http://localhost:5173** to view the application in your browser!

---

## 📸 Screenshots

*(Add screenshots of your beautiful dark UI, product grids, and checkout flow here)*

---

<div align="center">
  <i>Developed with precision and passion for mechanical keyboard enthusiasts.</i>
</div>
