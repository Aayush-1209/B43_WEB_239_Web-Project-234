const mongoose = require("mongoose");

const ItinerarySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Ensure ref is correct
    destinationId: { type: mongoose.Schema.Types.ObjectId, ref: "Destination", required: true }, // ✅ Ensure ref is correct
    title: { type: String, required: true },
    activities: [{ type: String, required: true }],
    date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Itinerary", ItinerarySchema);
