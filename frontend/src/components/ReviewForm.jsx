import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Ensure auth context is used

const ReviewForm = ({ destinationId, onReviewAdded }) => {
  const { user } = useAuth(); // Get logged-in user
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to submit a review!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/reviews/add",
        { destinationId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Review submitted successfully!");
      setComment("");
      setRating(5);
      onReviewAdded(); // Refresh reviews
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error);
    }
  };

  return (
    <div>
      <h3>Leave a Review</h3>
      <form onSubmit={handleSubmit}>
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num} ⭐</option>
          ))}
        </select>

        <textarea
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
