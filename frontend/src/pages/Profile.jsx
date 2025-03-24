import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import PreferencesForm from "../components/PreferencesForm";

const Profile = () => {
  const { user, logout } = useAuth();
  const [preferences, setPreferences] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("🚨 No token found, user might not be logged in.");
          return;
        }

        // ✅ Fetch user preferences
        const prefResponse = await axios.get(
          "http://localhost:5000/users/preferences",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("📌 Preferences API Response:", prefResponse.data);
        setPreferences(prefResponse.data);

        // ✅ Fetch user itineraries
        const itineraryResponse = await axios.get(
          "http://localhost:5000/itineraries/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("📌 Itineraries API Response:", itineraryResponse.data); // 🔍 Log response
        setItineraries(itineraryResponse.data);
      } catch (error) {
        console.error(
          "❌ Error fetching profile data:",
          error.response?.data || error
        );
      }
    };

    fetchProfileData();
  }, []);

  const handleDeletePreferences = async () => {
    if (!window.confirm("Are you sure you want to delete your preferences?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5000/users/preferences", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Update UI without refresh
      setPreferences({
        category: "",
        location: "",
        budget: "",
        activities: [],
      });
      console.log("✅ Preferences updated in UI");
    } catch (error) {
      console.error("Error deleting preferences:", error);
    }
  };

  const handleDeleteItinerary = async (id) => {
    if (!window.confirm("Are you sure you want to delete this itinerary?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/itineraries/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItineraries(itineraries.filter((itinerary) => itinerary._id !== id));
    } catch (error) {
      console.error("Error deleting itinerary:", error);
    }
  };

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <PreferencesForm />
      <h3>Your Preferences</h3>
      {preferences ? (
        <div>
          <p>
            <strong>Category:</strong> {preferences.category}
          </p>
          <p>
            <strong>Location:</strong> {preferences.location}
          </p>
          <p>
            <strong>Budget:</strong> {preferences.budget}
          </p>
          <p>
            <strong>Activities:</strong> {preferences.activities.join(", ")}
          </p>
          <button
            onClick={handleDeletePreferences}
            style={{
              backgroundColor: "red",
              color: "white",
              marginTop: "10px",
            }}
          >
            Delete Preferences
          </button>
        </div>
      ) : (
        <p>Loading preferences...</p>
      )}

      <h3>Your Itineraries</h3>
      {itineraries.length > 0 ? (
        itineraries.map((itinerary) => (
          <div key={itinerary._id}>
            <h4>{itinerary.title}</h4>
            <p>
              <strong>Destination:</strong>{" "}
              {itinerary.destinationId?.name || "Unknown"}
            </p>
            <p>
              <strong>Activities:</strong> {itinerary.activities.join(", ")}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(itinerary.date).toLocaleDateString()}
            </p>
            <button onClick={() => handleDeleteItinerary(itinerary._id)}>
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No itineraries found.</p>
      )}

      <button
        onClick={logout}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
