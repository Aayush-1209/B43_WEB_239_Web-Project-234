import { useState } from "react";
import { Link } from "react-router-dom";
import ItineraryForm from "../itineraries/ItineraryForm";
import { useAuth } from "../../context/AuthContext";

const DestinationCard = ({ destination, hidePlanTrip }) => {
  const { user } = useAuth() // ✅ Check if user is logged in
  const [showForm, setShowForm] = useState(false);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="destination-card">
      <h3>{destination.name}</h3>

      {/* Display multiple images */}
      <div className="image-gallery">
        {destination.images?.length > 0 ? (
          destination.images.map((img, index) => (
            <img key={index} src={img} alt={`destination-${index}`} width={200} />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>

      <p><strong>Location:</strong> {destination.location}</p>
      <p><strong>Activities:</strong> {destination.activities.join(", ")}</p>
      <p><strong>Average Cost:</strong> ${destination.averageCost}</p>
      <p><strong>Best Time to Visit:</strong> {destination.bestTimeToVisit}</p>
      <p><strong>Category:</strong> {destination.category}</p>

      {/* ✅ View Details (Require Login) */}
      <Link to={user ? `/destinations/${destination._id}` : "/login"}>
        <button>{user ? "View Details" : "Login to View Details"}</button>
      </Link>

      {/* ✅ Hide "Plan Trip" if user is not logged in */}
      {!hidePlanTrip && user && (
        <>
          <button 
            onClick={() => setShowForm(!showForm)} 
            style={{ marginLeft: "10px", background: "green", color: "white" }}
          >
            {showForm ? "Cancel" : "Plan Trip"}
          </button>

          {showForm && <ItineraryForm destinationId={destination._id} onClose={handleCloseForm} />}
        </>
      )}
    </div>
  );
};

export default DestinationCard;
