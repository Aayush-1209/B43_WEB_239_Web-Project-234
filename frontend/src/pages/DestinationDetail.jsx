import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ItineraryList from "../components/itineraries/ItineraryList";
import Reviews from "../components/reviews";

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details"); // Manage tab switching

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/destinations/get/${id}`);
        setDestination(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destination details:", error);
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!destination) return <p>Destination not found.</p>;

  return (
    <div className="destination-detail">
      <h2>{destination.name}</h2>
      <img src={destination.images[0]} alt={destination.name} width={300} />
      <p>{destination.description}</p>
      <p><strong>Location:</strong> {destination.location}</p>
      <p><strong>Activities:</strong> {destination.activities.join(", ")}</p>
      <p><strong>Best Time to Visit:</strong> {destination.bestTimeToVisit}</p>
      <p><strong>Category:</strong> {destination.category}</p>

      {/* Tab Navigation */}
      <div className="tabs">
        <button onClick={() => setActiveTab("details")} className={activeTab === "details" ? "active" : ""}>Details</button>
        <button onClick={() => setActiveTab("reviews")} className={activeTab === "reviews" ? "active" : ""}>Reviews</button>
        <button onClick={() => setActiveTab("itineraries")} className={activeTab === "itineraries" ? "active" : ""}>Itineraries</button>
      </div>

      {/* Content Based on Active Tab */}
      {activeTab === "details" && (
        <div>
          <p><strong>Average Cost:</strong> ${destination.averageCost}</p>
          <p><strong>Ratings:</strong> ⭐⭐⭐⭐ (Dynamic coming soon)</p>
        </div>
      )}
      {activeTab === "reviews" && <Reviews destinationId={id} />}
      {activeTab === "itineraries" && <ItineraryList destinationId={id} />}
    </div>
  );
};

export default DestinationDetail;