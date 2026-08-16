# SmartSpend – Smart Expense Tracker

SmartSpend is a full-stack expense management application that helps users securely track, manage, and organize their daily expenses.

The application provides user authentication, expense management, search and filtering capabilities, and a responsive dashboard. It uses a React frontend, Node.js/Express backend, MongoDB for persistent storage, and JWT-based authentication.

## 🚀 Live Demo

**Live Application:**  
https://smart-expense-tracker-liart-rho.vercel.app/

**Backend API:**  
https://smart-expense-tracker-kkix.onrender.com/

---

## 📌 Project Overview

Managing daily expenses manually can make it difficult to understand spending patterns and maintain financial discipline.

SmartSpend was developed as a full-stack web application to provide a simple and secure way to record and manage personal expenses.

Users can create an account, log in securely, add expenses, view their transaction history, search and filter expenses, edit existing transactions, and delete transactions when required.

The application follows a client-server architecture where the React frontend communicates with REST APIs built using Node.js and Express.js. User and expense data are stored in MongoDB Atlas.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcrypt.js

### Database
- MongoDB
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel – Frontend
- Render – Backend
- MongoDB Atlas – Database

### Development Tools
- Git
- GitHub
- VS Code
- Thunder Client

---

## ✨ Key Features

### 🔐 User Authentication
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected expense APIs
- User-specific expense data

### 💰 Expense Management
- Add new expenses
- Edit existing expenses
- Delete expenses
- View all personal transactions
- Automatic expense date handling

### 🔎 Search & Filtering
- Search expenses by category
- Search expenses by description
- Filter expenses by category
- Clear filters when no results are found

### 💳 Payment Methods
Users can record expenses using different payment methods:

- UPI
- Cash
- Credit Card
- Debit Card
- Net Banking
- Other

### 📊 Dashboard
- Displays recent expenses
- Shows transaction count
- Provides an organized view of financial transactions
- Responsive layout for different screen sizes

### 🛡️ Data Security
- Passwords are never stored in plain text
- JWT tokens are used for authentication
- Expense queries are restricted to the authenticated user
- Environment variables are used for sensitive configuration

---

## 🏗️ Project Architecture

```text
                    ┌──────────────────────┐
                    │      React.js        │
                    │      Frontend        │
                    │       Vercel         │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌──────────────────────┐
                    │    Node.js +         │
                    │    Express.js        │
                    │       Render         │
                    └──────────┬───────────┘
                               │
                         Mongoose ODM
                               │
                               ▼
                    ┌──────────────────────┐
                    │      MongoDB         │
                    │       Atlas          │
                    └──────────────────────┘
