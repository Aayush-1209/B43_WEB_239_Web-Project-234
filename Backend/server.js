require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const authRoutes = require('./routes/authRoutes'); 
const connectDB = require('./config/db');
const preferenceRoutes = require('./routes/preferenceRoutes');
const reviewRoutes = require("./routes/reviewRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get('/' , (req,res)=>{
    res.status(200).json({msg:"API is working"})
})

app.use('/users', userRoutes);
app.use('/destinations', destinationRoutes);
app.use('/auth', authRoutes); 
app.use("/preferences" , preferenceRoutes);
app.use("/reviews", reviewRoutes);
app.use("/itineraries", itineraryRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connectDB()
    console.log(`Server running on port ${PORT}`)
});
