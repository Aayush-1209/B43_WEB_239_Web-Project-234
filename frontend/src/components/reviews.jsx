import { useState, useEffect } from "react";
import axios from "axios";
import ReviewForm from "./ReviewForm";

const Reviews = ({ destinationId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/reviews/${destinationId}`);
      setReviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [destinationId]);

  return (
    <div>
      <h3>Reviews</h3>
      {loading ? <p>Loading reviews...</p> : reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id}>
            <p><strong>{review.userId?.name || "Anonymous"}:</strong> {review.comment}</p>
            <p>⭐ {review.rating} / 5</p>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}

      {/* ✅ Add Review Form */}
      <ReviewForm destinationId={destinationId} onReviewAdded={fetchReviews} />
    </div>
  );
};

export default Reviews;
