const express = require('express');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');
const { getPopularDestinations,getDestinations, getDestinationById, createDestination, updateDestination, deleteDestination } = require('../controllers/destinationController');
const { upload } = require("../config/cloudinary"); // Import Cloudinary Multer Middleware

const router = express.Router();


router.get('/get',isAuthenticated, getDestinations);
router.get('/popular', getPopularDestinations); 
router.get('/get/:id', getDestinationById); 
router.post('/create', isAuthenticated, isAdmin, upload.array("images", 5), createDestination);
router.put('/update/:id', isAuthenticated, isAdmin, upload.single("image"), updateDestination); 
router.delete('/delete/:id', isAuthenticated, isAdmin, deleteDestination); 

module.exports = router;
