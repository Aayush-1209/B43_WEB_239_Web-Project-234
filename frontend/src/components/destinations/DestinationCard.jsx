import { Link } from "react-router-dom";

const DestinationCard = ({ destination }) => {
  return (
    <div className="destination-card">
      <h3>{destination.name}</h3>

      {/* Display multiple images */}
      <div className="image-gallery">
        {destination.images && destination.images.length > 0 ? (
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
      <p><strong>Reviews:</strong> {destination.reviews?.length || 0} Reviews</p>
      <p><strong>Itinerary:</strong> {destination.itinerary?.length || 0} Plans</p>

      {/* ✅ View Details Button */}
      <Link to={`/destinations/${destination._id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
};

export default DestinationCard;
