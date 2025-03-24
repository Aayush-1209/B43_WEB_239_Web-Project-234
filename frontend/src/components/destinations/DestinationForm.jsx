import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const DestinationForm = () => {
  const { user } = useAuth()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [activities, setActivities] = useState("");
  const [averageCost, setAverageCost] = useState("");
  const [bestTimeToVisit, setBestTimeToVisit] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  if (!user || user.role !== "admin") {
    return <h2>Access Denied. Only admins can add destinations.</h2>;
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get auth token

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("activities", activities);
    formData.append("averageCost", averageCost);
    formData.append("bestTimeToVisit", bestTimeToVisit);
    formData.append("category", category);
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post("http://localhost:5000/destinations/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Sending the token
        },
      });
      alert("Destination added successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload destination.");
    }
  };

  return (
    <div>
      <h2>Add New Destination</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input type="text" placeholder="Activities" value={activities} onChange={(e) => setActivities(e.target.value)} required />
        <input type="number" placeholder="Average Cost" value={averageCost} onChange={(e) => setAverageCost(e.target.value)} required />
        <input type="text" placeholder="Best Time to Visit" value={bestTimeToVisit} onChange={(e) => setBestTimeToVisit(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <input type="file" multiple onChange={handleImageChange} required />
        <div>{preview.map((src, index) => <img key={index} src={src} alt="preview" width={100} />)}</div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DestinationForm;
