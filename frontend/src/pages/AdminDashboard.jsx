import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import DestinationForm from "../components/destinations/DestinationForm";

const AdminDashboard = () => {
    const { user } = useAuth();
    console.log("Current User:", user);

    const [destinations, setDestinations] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchDestinations();
        fetchReviews();
    }, []);

    // Fetch All Destinations
    const fetchDestinations = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/destinations/get", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDestinations(response.data.destinations);
        } catch (error) {
            console.error("Error fetching destinations:", error);
        }
    };

    // Fetch All Reviews
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

    // Delete Destination
    const handleDeleteDestination = async (id) => {
        if (!window.confirm("Are you sure you want to delete this destination?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/destinations/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDestinations(destinations.filter(dest => dest._id !== id));
        } catch (error) {
            console.error("Error deleting destination:", error);
        }
    };

    // Delete Review
    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/reviews/delete/${reviewId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReviews(reviews.filter(review => review._id !== reviewId));
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>

            {/* ADD DESTINATION FORM */}
            <h3>Add New Destination</h3>
            <DestinationForm onDestinationAdded={fetchDestinations} />
            {/* DESTINATIONS LIST */}
            <h3>Manage Destinations</h3>
            {destinations.length === 0 ? <p>No destinations available.</p> : (
                <ul>
                    {destinations.map(dest => (
                        <li key={dest._id}>
                            {dest.name}
                            <Link to={`/admin/edit/${dest._id}`}>
                                <button>Edit</button>
                            </Link>
                            <button onClick={() => handleDeleteDestination(dest._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}

            {/* REVIEWS LIST */}
            <h3>Manage Reviews</h3>
            {reviews.length === 0 ? <p>No reviews available.</p> : (
                <ul>
                    {reviews.map(review => (
                        <li key={review._id}>
                            <strong>User:</strong> {review.userId?.name || "Anonymous"}<br />
                            <strong>Destination:</strong> {review.destinationId?.name || "Unknown"}<br />
                            <strong>Rating:</strong> {review.rating} ★<br />
                            <strong>Comment:</strong> {review.comment}
                            <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminDashboard;
