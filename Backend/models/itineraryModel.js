const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    destinationId: { type: mongoose.Schema.Types.ObjectId, ref: "Destination", required: true },
    activities: [{ type: String, required: true }],
    date: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Itinerary", itinerarySchema);
