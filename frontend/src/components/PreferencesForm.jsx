import { useState } from "react";
import axios from "axios";

const PreferencesForm = () => {
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [budget, setBudget] = useState("");
    const [activities, setActivities] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!category || !location || !budget || !activities) {
            console.error("Please fill all fields.");
            return;
        }

        const preferences = { category, location, budget, activities: activities.split(",") };

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found. Please log in.");
                return;
            }

            await axios.put("http://localhost:5000/users/preferences", preferences, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Preferences updated successfully!");
        } catch (error) {
            console.error("Error updating preferences:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Category:
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter category"
                />
            </label>

            <label>
                Location:
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                />
            </label>

            <label>
                Budget:
                <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Enter budget"
                />
            </label>

            <label>
                Activities:
                <input
                    type="text"
                    value={activities}
                    onChange={(e) => setActivities(e.target.value)}
                    placeholder="Enter activities (comma-separated)"
                />
            </label>

            <button type="submit">Save Preferences</button>
        </form>
    );
};

export default PreferencesForm;
