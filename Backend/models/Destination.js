const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    images: { type: [String], required: true }, // Storing Cloudinary URL
    activities: [String],
    averageCost: { type: Number, required: true },
    bestTimeToVisit: String,
    category: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
