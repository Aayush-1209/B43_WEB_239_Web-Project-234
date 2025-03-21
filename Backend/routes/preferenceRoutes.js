const express = require("express");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { setPreferences, getPreferences } = require("../controllers/preferenceController");

const router = express.Router();

router.post("/set", isAuthenticated, setPreferences);
router.get("/get", isAuthenticated, getPreferences);

module.exports = router;
