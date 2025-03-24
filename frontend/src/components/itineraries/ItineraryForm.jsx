import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const ItineraryForm = ({ destinationId }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [activities, setActivities] = useState([""]);

  const handleActivityChange = (index, value) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = value;
    setActivities(updatedActivities);
  };

  const addActivity = () => {
    setActivities([...activities, ""]);
  };

  const removeActivity = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to create an itinerary");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/itineraries/add",
        { destinationId, title, description, date, activities },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Itinerary added successfully!");
      setTitle("");
      setDescription("");
      setDate("");
      setActivities([""]);
    } catch (error) {
      console.error("Error adding itinerary:", error);
    }
  };

  return (
    <div>
      <h3>Create an Itinerary</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <h4>Activities</h4>
        {activities.map((activity, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Activity"
              value={activity}
              onChange={(e) => handleActivityChange(index, e.target.value)}
              required
            />
            <button type="button" onClick={() => removeActivity(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addActivity}>Add Activity</button>
        <button type="submit">Submit Itinerary</button>
      </form>
    </div>
  );
};

export default ItineraryForm;