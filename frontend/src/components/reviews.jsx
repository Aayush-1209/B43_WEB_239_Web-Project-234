import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Reviews = ({ destinationId }) => {
  const { user } = useAuth
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/reviews/${destinationId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [destinationId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to add a review");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/reviews/add`,
        { destinationId, rating, comment: newReview },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReviews([...reviews, response.data]);
      setNewReview("");
      setRating(5);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!user || user.role !== "admin") return;
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
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id}>
            <p><strong>{review.user?.name || "Anonymous"}</strong>: {review.comment} ({review.rating}★)</p>
            {user?.role === "admin" && (
              <button onClick={() => handleDelete(review._id)}>Delete</button>
            )}
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
      {user && (
        <form onSubmit={handleReviewSubmit}>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <textarea
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          ></textarea>
          <button type="submit">Submit Review</button>
        </form>
      )}
    </div>
  );
};

export default Reviews;
