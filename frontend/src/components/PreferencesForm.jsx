import { useState } from "react";
import axios from "axios";

const PreferencesForm = () => {
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [budget, setBudget] = useState("");
    const [activities, setActivities] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const categoryOptions = [
        "Beach", "Mountain", "City", "Cultural", "Adventure", 
        "Wildlife", "Island", "Desert", "Countryside", "Historical"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!category || !location || !budget || !activities) {
            setError("Please fill all fields.");
            return;
        }

        const preferences = { 
            category, 
            location, 
            budget: Number(budget), 
            activities: activities.split(",").map(activity => activity.trim()) 
        };

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No token found. Please log in.");
                setLoading(false);
                return;
            }

            await axios.put("http://localhost:5000/users/preferences", preferences, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSuccess(true);
            setLoading(false);
        } catch (error) {
            setError(error.response?.data?.message || "Error updating preferences. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Travel Preferences</h2>
            
            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4">
                    Your travel preferences have been updated successfully!
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select a category</option>
                        {categoryOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Location
                    </label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Asia, Europe, California"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Budget (USD)
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                            type="number"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            placeholder="Your travel budget"
                            className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            min="0"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Activities
                    </label>
                    <input
                        type="text"
                        value={activities}
                        onChange={(e) => setActivities(e.target.value)}
                        placeholder="e.g. hiking, swimming, food tours (comma-separated)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">Separate multiple activities with commas</p>
                </div>

                <div className="pt-2">
                    <button 
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </span>
                        ) : "Save Preferences"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PreferencesForm;