import { useAuth } from "../../context/AuthContext";

const ItineraryCard = ({ itinerary, onDelete }) => {
  const { user } = useAuth();

  return (
    <div className="itinerary-card">
      <h4>{itinerary.title}</h4>
      <p><strong>Date:</strong> {new Date(itinerary.date).toLocaleDateString()}</p>
      <p><strong>Activities:</strong> {itinerary.activities.join(", ")}</p>
      <p><strong>Created by:</strong> {itinerary.user?.name || "Unknown"}</p>

      {user && (user.role === "admin" || user.id === itinerary.userId) && (
        <button onClick={() => onDelete(itinerary._id)}>Delete</button>
      )}
    </div>
  );
};

export default ItineraryCard;
