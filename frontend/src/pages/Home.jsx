import { useState, useEffect } from "react";
import axios from "axios";
import DestinationCard from "../components/destinations/DestinationCard";

const Home = () => {
  const [popularDestinations, setPopularDestinations] = useState([]);

  useEffect(() => {
    const fetchPopularDestinations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/destinations/popular"); // ✅ Public API
        setPopularDestinations(response.data);
      } catch (error) {
        console.error("Error fetching popular destinations:", error);
      }
    };

    fetchPopularDestinations();
  }, []);

  return (
    <div>
      <h1>Welcome to the Destination App</h1>
      
      {/* ✅ Show Popular Destinations */}
      <h2>Popular Destinations</h2>
      <div className="destination-list">
        {popularDestinations.length > 0 ? (
          popularDestinations.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} hidePlanTrip />
          ))
        ) : (
          <p>Loading destinations...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
