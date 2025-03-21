const express = require('express');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');
const { getDestinations, getDestinationById, createDestination, updateDestination, deleteDestination } = require('../controllers/destinationController');

const router = express.Router();

router.get('/get', getDestinations); 
router.get('/get/:id', getDestinationById); 
router.post('/create', isAuthenticated, isAdmin, createDestination);
router.put('/update/:id', isAuthenticated, isAdmin, updateDestination); 
router.delete('/delete/:id', isAuthenticated, isAdmin, deleteDestination); 

module.exports = router;
