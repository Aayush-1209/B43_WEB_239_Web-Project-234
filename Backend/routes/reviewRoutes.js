const express = require("express");
const router = express.Router();
const { addReview, getReviews } = require("../controllers/reviewController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
// console.log("addReview:", addReview);
// console.log("Type of addReview:", typeof addReview);

// Ensure addReview is defined before using it
// if (!addReview) {
//     throw new Error("addReview is undefined before route definition!");
// }

// Define review routes
router.post("/add",isAuthenticated ,addReview);
router.get("/", getReviews);

module.exports = router;
