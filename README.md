# SmartSpend – Smart Expense Tracker

SmartSpend is a full-stack expense management application that allows users to securely track, manage, and organize their personal expenses.

The application provides user authentication, expense management, search and filtering, budget tracking, spending analytics, and a responsive dashboard.

The project follows a client-server architecture using React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for persistent data storage.

## 🚀 Live Demo

**Live Application:**  
https://smart-expense-tracker-liart-rho.vercel.app/

**Backend API:**  
https://smart-expense-tracker-kkix.onrender.com/

---

## 📌 Project Overview

Managing daily expenses manually can make it difficult to understand spending patterns and maintain financial discipline.

SmartSpend was developed to provide users with a simple and secure platform for recording and managing their expenses.

Users can:

- Create an account and log in securely
- Add new expenses
- View their transactions
- Edit existing expenses
- Delete expenses
- Search expenses
- Filter expenses by category
- Set a monthly budget
- Track monthly spending
- Monitor budget usage
- View spending analytics through charts

Each user's expenses are associated with their authenticated account, ensuring that users can only access their own financial data.

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
- Protected API routes
- User-specific expense access

### 💰 Expense Management

- Add new expenses
- Edit existing expenses
- Delete expenses
- View recent transactions
- Store expense amount, category, description, date, and payment method

### 🔎 Search & Filtering

- Search expenses by category
- Search expenses by description
- Filter expenses by category
- Clear filters when no matching results are found

### 💳 Payment Methods

Expenses can be recorded using:

- UPI
- Cash
- Credit Card
- Debit Card
- Net Banking
- Other

### 📊 Dashboard

The dashboard provides:

- Total expenses
- Current month's expenses
- Number of categories
- Number of transactions
- Monthly expense visualization
- Category-wise expense visualization

### 💵 Budget Tracking

- Set a monthly spending budget
- Track monthly spending
- Calculate remaining budget
- Display budget usage percentage
- Show warnings when spending approaches or exceeds the budget

### 🛡️ Data Security

- Passwords are hashed before being stored
- JWT tokens are used to authenticate protected requests
- Expense queries are restricted to the authenticated user
- Sensitive configuration is stored using environment variables

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
```

---

## 🔑 Authentication Flow

```text
User
 │
 ├──────────────► Register
 │                    │
 │                    ▼
 │              Express API
 │                    │
 │              bcrypt hashing
 │                    │
 │                    ▼
 │               MongoDB
 │
 │
 └──────────────► Login
                      │
                      ▼
                Express API
                      │
                bcrypt verification
                      │
                      ▼
                 JWT generated
                      │
                      ▼
             Frontend stores token
                      │
                      ▼
            Protected API requests
                      │
                      ▼
             JWT authentication
                      │
                      ▼
             Expense operations
```

### How it works

1. A user registers with their name, email, and password.
2. The backend validates the input.
3. The password is hashed using bcrypt before being stored in MongoDB.
4. During login, bcrypt verifies the entered password against the stored hash.
5. A JWT token is generated after successful authentication.
6. The frontend stores the authentication token.
7. The token is sent with protected API requests.
8. The backend verifies the token and identifies the authenticated user.
9. Expense operations are performed only for that authenticated user.

---

## 📂 Project Structure

```text
smart-expense-tracker/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddExpenseForm.jsx
│   │   │   ├── BudgetCard.jsx
│   │   │   ├── CategoryChart.jsx
│   │   │   ├── EditExpenseModal.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── MonthlyExpenseChart.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── SummaryCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── expenseController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── user.js
│   │   └── Expense.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔌 REST API

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Expenses

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/expenses` | Create an expense |
| GET | `/api/expenses` | Get user's expenses |
| GET | `/api/expenses/:id` | Get a specific expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |

Expense endpoints are protected using JWT authentication.

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Anushakalva/smart-expense-tracker.git

cd smart-expense-tracker
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Do not commit your `.env` file or expose your database credentials or JWT secret.**

### 5. Start the backend

```bash
cd backend
npm run dev
```

### 6. Start the frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend will run using the Vite development server.

---

## 🌐 Deployment

The application is deployed using separate frontend and backend services.

### Frontend

**Vercel**

https://smart-expense-tracker-liart-rho.vercel.app/

### Backend

**Render**

https://smart-expense-tracker-kkix.onrender.com/

### Database

**MongoDB Atlas**

---

## 🔮 Future Improvements

Potential future improvements include:

- Advanced monthly spending analytics
- More detailed financial reports
- Export expenses as CSV/PDF
- Recurring expense support
- Improved mobile experience
- More advanced spending insights
- Expense notifications and reminders

---

## 👩‍💻 Author

**Anusha Kalva**

Computer Science Engineering Student

GitHub:  
https://github.com/Anushakalva
