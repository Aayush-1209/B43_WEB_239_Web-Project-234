const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");  // Attach user data to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token failed or expired" });
    }
};


const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: "Access denied, admin only" });
    }
};

module.exports = { isAuthenticated, isAdmin };
