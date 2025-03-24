import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import PreferencesForm from "../components/PreferencesForm";

const Profile = () => {
  const { user, logout } = useAuth();
  const [preferences, setPreferences] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("🚨 No token found, user might not be logged in.");
          setError("Authentication error. Please log in again.");
          setLoading(false);
          return;
        }

        // ✅ Fetch user preferences
        const prefResponse = await axios.get(
          "https://tripsage.onrender.com/users/preferences",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("📌 Preferences API Response:", prefResponse.data);
        setPreferences(prefResponse.data);

        // ✅ Fetch user itineraries
        const itineraryResponse = await axios.get(
          "https://tripsage.onrender.com/itineraries/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("📌 Itineraries API Response:", itineraryResponse.data); // 🔍 Log response
        setItineraries(itineraryResponse.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "❌ Error fetching profile data:",
          error.response?.data || error
        );
        setError("Failed to load profile data. Please try again later.");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleDeletePreferences = async () => {
    if (!window.confirm("Are you sure you want to delete your preferences?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete("https://tripsage.onrender.com/users/preferences", {
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
      await axios.delete(`https://tripsage.onrender.com/itineraries/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItineraries(itineraries.filter((itinerary) => itinerary._id !== id));
    } catch (error) {
      console.error("Error deleting itinerary:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h2 className="text-2xl font-bold text-white">
              Welcome, {user?.name}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-blue-100">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Preferences Form */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Add or Update Your Preferences
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <PreferencesForm />
          </div>
        </div>

        {/* Current Preferences */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Your Current Preferences
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {preferences ? (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="col-span-1 font-medium text-gray-500">Category</div>
                  <div className="col-span-2 text-gray-900">{preferences.category || "Not specified"}</div>
                  
                  <div className="col-span-1 font-medium text-gray-500">Location</div>
                  <div className="col-span-2 text-gray-900">{preferences.location || "Not specified"}</div>
                  
                  <div className="col-span-1 font-medium text-gray-500">Budget</div>
                  <div className="col-span-2 text-gray-900">{preferences.budget || "Not specified"}</div>
                  
                  <div className="col-span-1 font-medium text-gray-500">Activities</div>
                  <div className="col-span-2 text-gray-900">
                    {preferences.activities && preferences.activities.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {preferences.activities.map((activity, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    ) : (
                      "No activities specified"
                    )}
                  </div>
                </div>
                <div className="pt-3">
                  <button
                    onClick={handleDeletePreferences}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg className="mr-2 -ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Preferences
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center text-gray-500">
                No preferences set. Add your preferences using the form above.
              </div>
            )}
          </div>
        </div>

        {/* Itineraries */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Your Itineraries
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {itineraries.length > 0 ? (
              itineraries.map((itinerary) => (
                <div key={itinerary._id} className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{itinerary.title}</h4>
                      <p className="mt-2 text-sm text-gray-500">
                        <span className="font-medium">Destination:</span>{" "}
                        {itinerary.destinationId?.name || "Unknown"}
                      </p>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 font-medium">Activities:</p>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {itinerary.activities.map((activity, idx) => (
                            <span 
                              key={idx}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        <span className="font-medium">Date:</span>{" "}
                        {new Date(itinerary.date).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteItinerary(itinerary._id)}
                      className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-10 sm:px-6 text-center text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <p className="mt-2 text-sm font-medium">No itineraries found.</p>
                <p className="mt-1 text-sm text-gray-500">Start planning your trips by exploring destinations.</p>
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center">
          <button
            onClick={logout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg className="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;