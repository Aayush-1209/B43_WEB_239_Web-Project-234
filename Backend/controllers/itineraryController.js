const mongoose = require("mongoose")
const Itinerary = require("../models/itineraryModel"); // Ensure model is properly imported

// Add an itinerary
const addItinerary = async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from req.user
        const { destinationId, title, activities, date } = req.body;

        if (!destinationId || !title || !activities || !date) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newItinerary = new Itinerary({ userId, destinationId, title, activities, date });
        await newItinerary.save();

        res.status(201).json({ message: "Itinerary added successfully", itinerary: newItinerary });
    } catch (error) {
        console.error("Error adding itinerary:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all itineraries for a specific destination
const getItineraries = async (req, res) => {
    try {
        console.log("🔍 Incoming request to /itineraries/:destinationId");
        console.log("🔹 Received destinationId:", req.params.destinationId);

        // ✅ Validate if destinationId is a proper ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.destinationId)) {
            console.error("🚨 Invalid destinationId:", req.params.destinationId);
            return res.status(400).json({ message: "Invalid destination ID" });
        }

        const itineraries = await Itinerary.find({ destinationId: req.params.destinationId })
            .populate("userId", "name");

        res.status(200).json(itineraries);
    } catch (error) {
        console.error("❌ Error fetching itineraries:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};
 
const updateItinerary = async (req, res) => {
    try {
        const { itineraryId } = req.params;
        const { title, activities, date } = req.body;

        const updatedItinerary = await Itinerary.findByIdAndUpdate(
            itineraryId,
            { title, activities, date },
            { new: true }
        );

        if (!updatedItinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }

        res.status(200).json({ message: "Itinerary updated successfully", updatedItinerary });
    } catch (error) {
        console.error("Error updating itinerary:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// Delete an itinerary
const deleteItinerary = async (req, res) => {
    try {
        const { itineraryId } = req.params;
        const deletedItinerary = await Itinerary.findByIdAndDelete(itineraryId);

        if (!deletedItinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }

        res.status(200).json({ message: "Itinerary deleted successfully" });
    } catch (error) {
        console.error("Error deleting itinerary:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

const getUserItineraries = async (req, res) => {
    try {
        console.log("🔍 Incoming request to /itineraries/user");
        console.log("🔹 req.user:", req.user);

        if (!req.user || !mongoose.Types.ObjectId.isValid(req.user._id)) {
            console.error("🚨 Invalid or missing user ID.");
            return res.status(401).json({ message: "Unauthorized: Invalid user ID" });
        }

        const userId = new mongoose.Types.ObjectId(req.user._id); // ✅ Ensure valid ObjectId
        console.log("✅ Fetching itineraries for User ID:", userId);

        // 🔍 Check if `userId` is correctly being used in the query
        const query = { userId };
        console.log("📌 Query to be executed:", query);

        // ✅ Run the query and catch possible errors
        const itineraries = await Itinerary.find(query)
            .populate({ path: "destinationId", select: "name" }) // Ensure correct population
            .lean(); // Convert documents to plain JavaScript objects

        console.log("✅ Itineraries Fetched:", itineraries);
        res.status(200).json(itineraries);
    } catch (error) {
        console.error("❌ Error fetching user itineraries:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};
  
module.exports = { addItinerary, getItineraries, updateItinerary, deleteItinerary, getUserItineraries };

