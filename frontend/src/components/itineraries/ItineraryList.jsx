import { useState, useEffect } from "react";
import axios from "axios";

const ItineraryList = ({ destinationId }) => {
  const [itineraries, setItineraries] = useState([]);
  const [editingItinerary, setEditingItinerary] = useState(null);
  const [title, setTitle] = useState("");
  const [activities, setActivities] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchItineraries = async () => {
      if (!destinationId) {
        console.error("🚨 No destinationId provided.");
        return;
      }
  
      try {
        console.log(`📌 Fetching itineraries for destinationId: ${destinationId}`);
        const response = await axios.get(`http://localhost:5000/itineraries/${destinationId}`);
        console.log("✅ API Response:", response.data);
        setItineraries(response.data);
      } catch (error) {
        console.error("❌ Error fetching itineraries:", error.response?.data || error);
      }
    };
  
    fetchItineraries();
  }, [destinationId]);
  

  // DELETE ITINERARY FUNCTION
  const handleDelete = async (itineraryId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/itineraries/delete/${itineraryId}`, {
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

  // UPDATE ITINERARY FUNCTION
  const handleUpdate = async (itineraryId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/itineraries/update/${itineraryId}`,
        { title, activities: activities.split(","), date },
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

  return (
    <div>
      <h3>Itineraries</h3>
      {itineraries.length > 0 ? (
        itineraries.map((itinerary) => (
          <div key={itinerary._id}>
            {editingItinerary === itinerary._id ? (
              <div>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" value={activities} onChange={(e) => setActivities(e.target.value)} />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <button onClick={() => handleUpdate(itinerary._id)}>Save</button>
              </div>
            ) : (
              <div>
                <h4>{itinerary.title}</h4>
                <p>Activities: {itinerary.activities.join(", ")}</p>
                <p>Date: {new Date(itinerary.date).toDateString()}</p>
                <button onClick={() => startEditing(itinerary)}>Edit</button>
                <button onClick={() => handleDelete(itinerary._id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No itineraries found.</p>
      )}
    </div>
  );
};

export default ItineraryList;
