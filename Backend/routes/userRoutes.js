const express = require("express");
const { signup, login } = require("../controllers/authController");
const { updateUserPreferences } = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const router = express.Router();

// User Signup
router.post("/signup", signup);

// User Login
router.post("/login", login);

router.put("/preferences", isAuthenticated, updateUserPreferences);


module.exports = router;
