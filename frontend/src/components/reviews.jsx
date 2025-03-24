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
    <div className="bg-white rounded-lg shadow-md p-6 my-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Reviews</h3>
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading reviews...</span>
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-200 pb-4 last:border-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-800">
                    {review.userId?.name || "Anonymous"}
                  </p>
                  <div className="flex items-center mt-1 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg 
                        key={i}
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString() || ""}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-gray-200">
        <ReviewForm destinationId={destinationId} onReviewAdded={fetchReviews} />
      </div>
    </div>
  );
};

export default Reviews;