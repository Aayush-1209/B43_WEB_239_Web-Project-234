import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const AdminReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/reviews/admin/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/reviews/delete/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div>
      <h2>All Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="review-card">
            <p><strong>User:</strong> {review.userId?.name || "Anonymous"}</p>
            <p><strong>Destination:</strong> {review.destinationId?.name || "Unknown"}</p>
            <p><strong>Rating:</strong> {review.rating} ★</p>
            <p><strong>Comment:</strong> {review.comment}</p>
            <button onClick={() => handleDelete(review._id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};

export default AdminReviews;
