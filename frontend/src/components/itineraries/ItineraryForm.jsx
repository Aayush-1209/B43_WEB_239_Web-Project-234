import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const ItineraryForm = ({ destinationId, onClose }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [activities, setActivities] = useState([""]);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

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

      setLoading(false);

      if (onClose) {
        setTimeout(onClose, 500);
      }
    } catch (error) {
      console.error("Error adding itinerary:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Create an Itinerary 
          
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Give your itinerary a name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Describe your itinerary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-md font-medium text-gray-700">Activities</h4>
            <button 
              type="button" 
              onClick={addActivity}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Activity
            </button>
          </div>
          
          <div className="space-y-2">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Activity ${index + 1}`}
                  value={activity}
                  onChange={(e) => handleActivityChange(index, e.target.value)}
                  required
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                  type="button" 
                  onClick={() => removeActivity(index)}
                  className="inline-flex items-center justify-center p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-2 px-4 ${
              loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : "Submit Itinerary"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItineraryForm;