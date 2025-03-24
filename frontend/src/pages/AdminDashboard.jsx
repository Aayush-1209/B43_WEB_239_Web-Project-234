import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import DestinationForm from "../components/destinations/DestinationForm";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  console.log("Current User:", user);

  const [destinations, setDestinations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("destinations");

  useEffect(() => {
    fetchDestinations();
    fetchReviews();
  }, []);

  // Fetch All Destinations
  const fetchDestinations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://tripsage.onrender.com/destinations/get",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDestinations(response.data.destinations);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  // Fetch All Reviews
  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://tripsage.onrender.com/reviews/admin/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Delete Destination
  const handleDeleteDestination = async (id) => {
    if (!window.confirm("Are you sure you want to delete this destination?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://tripsage.onrender.com/destinations/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDestinations(destinations.filter((dest) => dest._id !== id));
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  };
  const handleUpdateDestination = async (id) => {
    if (!window.confirm("Are you sure you want to delete this destination?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://tripsage.onrender.com/destinations/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDestinations(destinations.filter((dest) => dest._id !== id));
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  };

  // Delete Review
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://tripsage.onrender.com/reviews/delete/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("destinations")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "destinations"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Destinations
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "reviews"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Reviews
          </button>
        </nav>
      </div>

      {/* Destinations Tab Content */}
      {activeTab === "destinations" && (
        <div>
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Add New Destination
              </h2>
            </div>
            <div className="px-6 py-5">
              <DestinationForm onDestinationAdded={fetchDestinations} />
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Manage Destinations
              </h2>
            </div>
            <div className="px-6 py-5">
              {destinations.length === 0 ? (
                <p className="text-gray-500 text-center py-6">
                  No destinations available.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Destination
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {destinations.map((dest) => (
                        <tr key={dest._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {dest.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleUpdateDestination(dest._id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              {" "}
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteDestination(dest._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reviews Tab Content */}
      {activeTab === "reviews" && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Manage Reviews
            </h2>
          </div>
          <div className="px-6 py-5">
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-center py-6">
                No reviews available.
              </p>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium text-gray-700">
                            User:
                          </span>{" "}
                          {review.userId?.name || "Anonymous"}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          <span className="font-medium text-gray-700">
                            Destination:
                          </span>{" "}
                          {review.destinationId?.name || "Unknown"}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="font-medium text-gray-700 text-sm mr-1">
                            Rating:
                          </span>
                          <div className="flex text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mt-2">{review.comment}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="text-red-600 hover:text-red-900 text-sm flex items-center h-6"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
