const express = require("express");
const router = express.Router();
const { addItinerary, getItineraries } = require("../controllers/itineraryController");
const { isAuthenticated } = require("../middlewares/authMiddleware");


// console.log("addItinerary:", addItinerary);
// console.log("Type of addItinerary:", typeof addItinerary);

// if (!addItinerary) {
//     throw new Error("❌ addItinerary is undefined before route definition!");
// }

// Define itinerary routes
router.post("/add", isAuthenticated, addItinerary);
router.get("/", getItineraries);

module.exports = router;
