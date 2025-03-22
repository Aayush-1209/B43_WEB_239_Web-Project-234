const Itinerary = require("../models/itineraryModel"); // Ensure model is properly imported

// Add an itinerary
const addItinerary = async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from req.user
        const { destinationId, activities, date } = req.body;

        if (!destinationId || !activities || !date) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newItinerary = new Itinerary({ userId, destinationId, activities, date });
        await newItinerary.save();

        res.status(201).json({ message: "Itinerary added successfully", itinerary: newItinerary });
    } catch (error) {
        console.error("Error adding itinerary:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all itineraries
const getItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find();
        res.status(200).json(itineraries);
    } catch (error) {
        console.error("Error fetching itineraries:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { addItinerary, getItineraries };
