import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ReviewForm = ({ destinationId, onReviewAdded }) => {
  const { user } = useAuth();
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
      onReviewAdded();
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Leave a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">Rating:</label>
          <select 
            value={rating} 
            onChange={(e) => setRating(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num} ⭐</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <textarea
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          ></textarea>
        </div>

        <button 
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;