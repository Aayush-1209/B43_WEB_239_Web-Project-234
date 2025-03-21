const mongoose = require("mongoose");

const ItinerarySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    destinations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Destination" }],
    activities: [{ type: String }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Itinerary", ItinerarySchema);
