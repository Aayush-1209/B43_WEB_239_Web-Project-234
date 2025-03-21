const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    images: [{ type: String }],
    activities: [{ type: String }],
    averageCost: { type: Number, required: true },
    bestTimeToVisit: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model('Destination', DestinationSchema);
