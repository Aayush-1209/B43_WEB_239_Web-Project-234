const express = require("express");
const router = express.Router();
const { addReview, getReviews, getAllReviews, deleteReview } = require("../controllers/reviewController");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");
// console.log("addReview:", addReview);
// console.log("Type of addReview:", typeof addReview);

// Ensure addReview is defined before using it
// if (!addReview) {
//     throw new Error("addReview is undefined before route definition!");
// }

// Define review routes
router.post("/add",isAuthenticated ,addReview);
router.get("/:destinationId", getReviews);
router.get("/admin/all", isAuthenticated, isAdmin, getAllReviews);
router.delete("/delete/:reviewId", isAuthenticated, isAdmin, deleteReview);

module.exports = router;
