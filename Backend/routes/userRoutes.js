const express = require("express");
const { signup, login } = require("../controllers/authController");
const { updateUserPreferences,deleteUserPreferences, getUserPreferences } = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const router = express.Router();

// User Signup
router.post("/signup", signup);

// User Login
router.post("/login", login);

router.get("/preferences", isAuthenticated, getUserPreferences);
router.put("/preferences", isAuthenticated, updateUserPreferences);
router.delete("/preferences", isAuthenticated, deleteUserPreferences);

module.exports = router;
