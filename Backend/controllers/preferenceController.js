const Preference = require("../models/Preference");

// Save or update user preferences
const setPreferences = async (req, res) => {
    try {
        const { destinationType, budget, activities } = req.body;
        const userId = req.user._id; // User must be authenticated

        let preference = await Preference.findOne({ userId });

        if (preference) {
            preference.destinationType = destinationType;
            preference.budget = budget;
            preference.activities = activities;
        } else {
            preference = new Preference({ userId, destinationType, budget, activities });
        }

        await preference.save();
        res.status(200).json({ message: "Preferences saved successfully", preference });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get user preferences
const getPreferences = async (req, res) => {
    try {
        const userId = req.user._id;
        const preference = await Preference.findOne({ userId });

        if (!preference) {
            return res.status(404).json({ message: "No preferences found" });
        }

        res.status(200).json(preference);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { setPreferences, getPreferences };
