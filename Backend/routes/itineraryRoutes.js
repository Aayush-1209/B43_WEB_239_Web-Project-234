const express = require("express");
const router = express.Router();
const { addItinerary, getItineraries, updateItinerary, deleteItinerary, getUserItineraries } = require("../controllers/itineraryController");
const { isAuthenticated } = require("../middlewares/authMiddleware");


// console.log("addItinerary:", addItinerary);
// console.log("Type of addItinerary:", typeof addItinerary);

// if (!addItinerary) {
//     throw new Error(" addItinerary is undefined before route definition!");
// }

// Define itinerary routes
router.post("/add", isAuthenticated, addItinerary);

router.get("/user", isAuthenticated, getUserItineraries);

router.get("/:destinationId", getItineraries);

router.put("/update/:itineraryId", isAuthenticated, updateItinerary);

router.delete("/delete/:itineraryId", isAuthenticated, deleteItinerary);




module.exports = router;
