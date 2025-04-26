import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const DestinationForm = ({ onDestinationAdded, destinationToEdit, onEditComplete }) => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [activities, setActivities] = useState("");
  const [averageCost, setAverageCost] = useState("");
  const [bestTimeToVisit, setBestTimeToVisit] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    if (destinationToEdit) {
      setName(destinationToEdit.name || "");
      setDescription(destinationToEdit.description || "");
      setLocation(destinationToEdit.location || "");
      setActivities(destinationToEdit.activities || "");
      setAverageCost(destinationToEdit.averageCost || "");
      setBestTimeToVisit(destinationToEdit.bestTimeToVisit || "");
      setCategory(destinationToEdit.category || "");
      setIsEditing(true);
      

      if (destinationToEdit.images && destinationToEdit.images.length > 0) {
        setPreview(destinationToEdit.images);
      } else {
        setPreview([]);
      }
    } else {

      resetForm();
    }
  }, [destinationToEdit]);


  const resetForm = () => {
    setName("");
    setDescription("");
    setLocation("");
    setActivities("");
    setAverageCost("");
    setBestTimeToVisit("");
    setCategory("");
    setImages([]);
    setPreview([]);
    setIsEditing(false);
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg border border-red-200 p-6">
        <h2 className="text-xl font-semibold text-red-600">Access Denied. Only admins can add destinations.</h2>
      </div>
    );
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreview(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("activities", activities);
    formData.append("averageCost", averageCost);
    formData.append("bestTimeToVisit", bestTimeToVisit);
    formData.append("category", category);
    
    
    if (images.length > 0) {
      images.forEach((image) => formData.append("images", image));
    }

    try {
      let response;
      
      if (isEditing && destinationToEdit) {
       
        response = await axios.put(
          `https://tripsage.onrender.com/destinations/update/${destinationToEdit._id}`, 
          formData, 
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Destination updated successfully!");
      } else {
       
        response = await axios.post(
          "https://tripsage.onrender.com/destinations/create", 
          formData, 
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Destination added successfully!");
      }
      
     
      resetForm();
      if (isEditing && onEditComplete) {
        onEditComplete();
      }
      if (onDestinationAdded) {
        onDestinationAdded();
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Failed to ${isEditing ? "update" : "upload"} destination.`);
    }
  };

  const handleCancel = () => {
    resetForm();
    if (onEditComplete) {
      onEditComplete();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl overflow-hidden p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? "Edit Destination" : "Add New Destination"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Destination Name
          </label>
          <input 
            id="name"
            type="text" 
            placeholder="e.g. Eiffel Tower" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea 
            id="description"
            placeholder="Provide a detailed description of this destination..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input 
              id="location"
              type="text" 
              placeholder="e.g. Paris, France" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input 
              id="category"
              type="text" 
              placeholder="e.g. Landmark, Beach, Mountain" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="activities" className="block text-sm font-medium text-gray-700 mb-1">
            Activities
          </label>
          <input 
            id="activities"
            type="text" 
            placeholder="e.g. Sightseeing, Swimming, Hiking" 
            value={activities} 
            onChange={(e) => setActivities(e.target.value)} 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="averageCost" className="block text-sm font-medium text-gray-700 mb-1">
              Average Cost ($)
            </label>
            <input 
              id="averageCost"
              type="number" 
              placeholder="e.g. 500" 
              value={averageCost} 
              onChange={(e) => setAverageCost(e.target.value)} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="bestTimeToVisit" className="block text-sm font-medium text-gray-700 mb-1">
              Best Time to Visit
            </label>
            <input 
              id="bestTimeToVisit"
              type="text" 
              placeholder="e.g. Summer, June-August" 
              value={bestTimeToVisit} 
              onChange={(e) => setBestTimeToVisit(e.target.value)} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
            Images {isEditing && "(Optional - leave empty to keep existing images)"}
          </label>
          <input 
            id="images"
            type="file" 
            multiple 
            onChange={handleImageChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required={!isEditing}
          />
          
          {preview.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {preview.map((src, index) => (
                <div key={index} className="relative">
                  <img 
                    src={typeof src === 'string' ? src : ""} 
                    alt={`Preview ${index + 1}`} 
                    className="h-24 w-24 object-cover rounded-md border border-gray-200"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          {isEditing && (
            <button 
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white py-3 px-6 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          )}
          
          <button 
            type="submit"
            className={`${isEditing ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"} text-white py-3 px-6 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isEditing ? "" : "w-full"}`}
          >
            {isEditing ? "Update Destination" : "Add Destination"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DestinationForm;