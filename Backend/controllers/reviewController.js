const Review = require("../models/reviewModel"); // Ensure model is properly imported

// Add a review
const addReview = async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from req.user
        const { destinationId, rating, comment } = req.body;

        if (!destinationId || !rating || !comment) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newReview = new Review({ userId, destinationId, rating, comment });
        await newReview.save();

        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};;

// Get all reviews
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { addReview, getReviews };
