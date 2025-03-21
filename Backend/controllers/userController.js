const User = require("../models/User");

const updateUserPreferences = async (req, res) => {
    try {
        const { category, location, budget, activities } = req.body;

        if (!category && !location && !budget && !activities) {
            return res.status(400).json({ message: "Provide at least one preference to update." });
        }

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.preferences = { category, location, budget, activities };
        await user.save();

        res.status(200).json({ message: "Preferences updated successfully", preferences: user.preferences });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { updateUserPreferences };
