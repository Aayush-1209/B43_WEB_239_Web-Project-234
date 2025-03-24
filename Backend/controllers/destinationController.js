// 🔍 Get all destinations with Filtering & Pagination
const Destination = require("../models/Destination");
const User = require("../models/User"); // Import User model

const getDestinations = async (req, res) => {
    console.log("Received Query Params:", req.query);

    try {
        const { search, category, location, minCost, maxCost, sort, page = 1, limit = 10 } = req.query;
        let query = {};

        // ✅ **General Filters**
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }
        if (category) {
            query.category = category;
        }
        if (location) {
            query.location = { $regex: location, $options: "i" };
        }
        if (minCost && maxCost) {
            query.averageCost = { $gte: parseInt(minCost), $lte: parseInt(maxCost) };
        }

        // ✅ **Fetch User Preferences from User Model**
        let userPreferences = {};
        if (req.user) {
            const user = await User.findById(req.user._id).select("preferences");

            if (user && user.preferences) {
                userPreferences = {
                    category: user.preferences.category,
                    location: user.preferences.location,
                    budget: user.preferences.budget,
                    activities: user.preferences.activities || [],
                };
            }
        }

        // ✅ **Apply User Preferences if Available**
        let preferenceQuery = [];
        if (userPreferences.category) {
            preferenceQuery.push({ category: userPreferences.category });
        }
        if (userPreferences.location) {
            preferenceQuery.push({ location: { $regex: userPreferences.location, $options: "i" } });
        }
        if (userPreferences.activities.length > 0) {
            preferenceQuery.push({ activities: { $in: userPreferences.activities } });
        }
        if (userPreferences.budget > 0) {
            preferenceQuery.push({ averageCost: { $lte: userPreferences.budget } });
        }

        // If preferences exist, merge them into the main query
        if (preferenceQuery.length > 0) {
            query.$and = preferenceQuery;
        }

        console.log("Final Query:", JSON.stringify(query, null, 2));

        // ✅ **Sorting Logic**
        let sortOption = { ratings: -1 }; // Default: highest-rated first
        if (sort) {
            if (sort === "price_asc") {
                sortOption = { averageCost: 1 }; // Low to High
            } else if (sort === "price_desc") {
                sortOption = { averageCost: -1 }; // High to Low
            }
        }

        console.log("Sorting applied:", sortOption);

        // ✅ **Fetch Destinations**
        const destinations = await Destination.find(query)
            .sort(sortOption)
            .skip((page - 1) * (parseInt(limit, 10) || 10))
            .limit(parseInt(limit, 10) || 10);

        // ✅ **Count total documents matching the query**
        const total = await Destination.countDocuments(query);

        res.status(200).json({ total, page, destinations });
    } catch (error) {
        console.error("Error fetching destinations:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { getDestinations };


// 🔍 Get a single destination by ID
const getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) return res.status(404).json({ message: "Destination not found" });

        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// ✅ Create a new destination (Admin Only)
const createDestination = async (req, res) => {
    try {
        const { name, description, location, activities, averageCost, bestTimeToVisit, category } = req.body;

        // Check if destination already exists
        const existingDestination = await Destination.findOne({ name });
        if (existingDestination) {
            return res.status(400).json({ message: "Destination already exists" });
        }

        // Check if an image was uploaded
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map(file => file.path); // Cloudinary URLs
        }

        // Create new destination
        const newDestination = new Destination({
            name,
            description,
            location,
            activities,
            averageCost,
            bestTimeToVisit,
            category,
            images: imageUrls,  // Store array of URLs
            createdBy: req.user._id
        });

        await newDestination.save();
        res.status(201).json({ message: "Destination created successfully", newDestination });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// 🔄 Update destination (Admin Only)
const updateDestination = async (req, res) => {
    try {
        let updateData = { ...req.body };

        // Check if a new image was uploaded
        if (req.file) {
            updateData.images = req.file.path; // Update with new Cloudinary URL
        }

        const updatedDestination = await Destination.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedDestination) {
            return res.status(404).json({ message: "Destination not found" });
        }

        res.status(200).json({ message: "Destination updated successfully", updatedDestination });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


// ❌ Delete destination (Admin Only)
const deleteDestination = async (req, res) => {
    try {
        const deletedDestination = await Destination.findByIdAndDelete(req.params.id);

        if (!deletedDestination) {
            return res.status(404).json({ message: "Destination not found" });
        }

        res.status(200).json({ message: "Destination deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = {
    getDestinations,
    getDestinationById,
    createDestination,
    updateDestination,
    deleteDestination
};
