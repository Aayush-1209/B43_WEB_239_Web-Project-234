import { useState, useEffect } from "react";
import axios from "axios";

const ItineraryList = ({ destinationId }) => {
  const [itineraries, setItineraries] = useState([]);
  const [editingItinerary, setEditingItinerary] = useState(null);
  const [title, setTitle] = useState("");
  const [activities, setActivities] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItineraries = async () => {
      if (!destinationId) {
        console.error("🚨 No destinationId provided.");
        setError("Missing destination information");
        setLoading(false);
        return;
      }
  
      try {
        console.log(`📌 Fetching itineraries for destinationId: ${destinationId}`);
        setLoading(true);
        const response = await axios.get(`https://tripsage.onrender.com/itineraries/${destinationId}`);
        console.log("✅ API Response:", response.data);
        setItineraries(response.data);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching itineraries:", error.response?.data || error);
        setError("Failed to load itineraries");
        setLoading(false);
      }
    };
  
    fetchItineraries();
  }, [destinationId]);
  
  // DELETE ITINERARY FUNCTION
  const handleDelete = async (itineraryId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://tripsage.onrender.com/itineraries/delete/${itineraryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setItineraries(itineraries.filter((itinerary) => itinerary._id !== itineraryId));
    } catch (error) {
      console.error("Error deleting itinerary:", error);
    }
  };

  // START EDITING
  const startEditing = (itinerary) => {
    setEditingItinerary(itinerary._id);
    setTitle(itinerary.title);
    setActivities(itinerary.activities.join(", "));
    setDate(itinerary.date.split("T")[0]);
  };

  // CANCEL EDITING
  const cancelEditing = () => {
    setEditingItinerary(null);
  };

  // UPDATE ITINERARY FUNCTION
  const handleUpdate = async (itineraryId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://tripsage.onrender.com/itineraries/update/${itineraryId}`,
        { title, activities: activities.split(",").map(item => item.trim()), date },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setItineraries(itineraries.map((itinerary) =>
        itinerary._id === itineraryId ? response.data.updatedItinerary : itinerary
      ));

      setEditingItinerary(null);
    } catch (error) {
      console.error("Error updating itinerary:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg my-4">
        <p className="font-medium">{error}</p>
        <p className="text-sm mt-1">Please try again later or contact support.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Itineraries</h3>
      </div>

      {itineraries.length > 0 ? (
        <div className="space-y-4">
          {itineraries.map((itinerary) => (
            <div 
              key={itinerary._id} 
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
            >
              {editingItinerary === itinerary._id ? (
                <div className="p-4">
                  <h4 className="text-lg font-medium text-gray-700 mb-3">Edit Itinerary</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Activities (comma separated)</label>
                      <input 
                        type="text" 
                        value={activities} 
                        onChange={(e) => setActivities(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input 
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                      <button 
                        onClick={cancelEditing}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handleUpdate(itinerary._id)}
                        className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-semibold text-gray-800">{itinerary.title}</h4>
                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {new Date(itinerary.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short', 
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1 mt-2">
                      {itinerary.activities.map((activity, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end space-x-2">
                    <button 
                      onClick={() => startEditing(itinerary)}
                      className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(itinerary._id)}
                      className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p className="text-gray-600">No itineraries found for this destination.</p>
          <p className="text-gray-500 text-sm mt-1">Create your own itinerary to help other travelers!</p>
        </div>
      )}
    </div>
  );
};

export default ItineraryList;