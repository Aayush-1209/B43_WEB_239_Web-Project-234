const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const isAuthenticated = async (req, res, next) => {
    try {
        console.log("🔍 Checking Authentication...");
        console.log("🔹 Authorization Header:", req.headers.authorization);

        if (!req.headers.authorization) {
            console.error("🚨 No token found in headers.");
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        const token = req.headers.authorization.split(" ")[1];
        console.log("🔹 Extracted Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🔹 Decoded Token:", decoded);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            console.error("🚨 User not found in DB.");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("✅ Authenticated User:", user);
        req.user = user;
        next();
    } catch (error) {
        console.error("🚨 Authentication failed:", error);
        return res.status(401).json({ message: "Token failed or expired", error });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Access denied, admin only" });
    }
};

module.exports = { isAuthenticated, isAdmin };
