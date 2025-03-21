const mongoose = require("mongoose");

const PreferenceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    destinationType: { type: [String], required: true }, // e.g., ["beach", "mountain"]
    budget: { type: String, required: true }, // e.g., "low", "medium", "high"
    activities: { type: [String], required: true } // e.g., ["hiking", "surfing"]
}, { timestamps: true });

module.exports = mongoose.model("Preference", PreferenceSchema);
