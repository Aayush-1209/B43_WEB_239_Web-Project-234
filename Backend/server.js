require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const authRoutes = require('./routes/authRoutes'); 
const connectDB = require('./config/db');
const reviewRoutes = require("./routes/reviewRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");

const app = express();
const allowedOrigins = [
    "http://localhost:5173", // Local dev
    "https://your-production-site.com" // Add your deployed frontend URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(express.json());

app.get('/' , (req,res)=>{
    res.status(200).json({msg:"API is working"})
})

app.use('/users', userRoutes);
app.use('/destinations', destinationRoutes);
app.use('/auth', authRoutes); 
app.use("/reviews", reviewRoutes);
app.use("/itineraries", itineraryRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connectDB()
    console.log(`Server running on port ${PORT}`)
});
