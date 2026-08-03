const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    message: "You accessed a protected route successfully",
    userId: req.userId,
  });
});

module.exports = router;