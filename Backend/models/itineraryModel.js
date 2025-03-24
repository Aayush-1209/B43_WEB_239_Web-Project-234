const mongoose = require("mongoose");

const ItinerarySchema = new mongoose.Schema({
    destinationId: { type: mongoose.Schema.Types.ObjectId, ref: "Destination", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true }, // ✅ Add title field
    activities: [{ type: String, required: true }],
    date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Itinerary", ItinerarySchema);
