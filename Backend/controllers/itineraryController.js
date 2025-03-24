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
        const { destinationId } = req.params;
        const itineraries = await Itinerary.find({ destinationId }).populate("userId", "name");

        if (!itineraries.length) {
            return res.status(404).json({ message: "No itineraries found for this destination" });
        }

        res.status(200).json(itineraries);
    } catch (error) {
        console.error("Error fetching itineraries:", error);
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
      const userId = req.user._id;
      const itineraries = await Itinerary.find({ userId }).populate("destinationId", "name");
  
      if (!itineraries.length) {
        return res.status(200).json([]); // Return empty array instead of 404
      }
  
      res.status(200).json(itineraries);
    } catch (error) {
      console.error("Error fetching user itineraries:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  };
  
module.exports = { addItinerary, getItineraries, updateItinerary, deleteItinerary, getUserItineraries };

