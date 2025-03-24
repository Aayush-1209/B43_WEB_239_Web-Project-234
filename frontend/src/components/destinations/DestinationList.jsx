import React, { useState, useEffect } from "react";
import axios from "axios";
import DestinationCard from "./DestinationCard";
import Filters from "../Filter";

const DestinationList = () => {
    const [destinations, setDestinations] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDestinations = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found. Please log in.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("https://tripsage.onrender.com/destinations/get", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    params: filters
                });

                if (Array.isArray(response.data.destinations)) {
                    setDestinations(response.data.destinations);
                } else {
                    setError("Invalid data format received from the server.");
                }
            } catch (error) {
                setError(error.response?.data?.message || "Error fetching destinations");
                console.error("Error fetching destinations:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, [filters]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Explore Destinations
            </h2>
            
            <div className="mb-8">
                <Filters onFilterChange={setFilters} />
            </div>
            
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-md">
                    <p className="text-red-700">{error}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {destinations.length > 0 ? (
                        destinations.map((destination) => (
                            <DestinationCard 
                                key={destination._id} 
                                destination={destination} 
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-16">
                            <svg 
                                className="mx-auto h-12 w-12 text-gray-400" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                aria-hidden="true"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                                />
                            </svg>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No destinations found</h3>
                            <p className="mt-1 text-gray-500">Try adjusting your filters or check back later.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DestinationList;