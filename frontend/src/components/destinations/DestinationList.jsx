import React, { useState, useEffect } from "react";
import axios from "axios";
import DestinationCard from "./DestinationCard";
import Filters from "../Filter";

const DestinationList = () => {
    const [destinations, setDestinations] = useState([]);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found.");
                    return;
                }

                const response = await axios.get("http://localhost:5000/destinations/get", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    params: filters
                });

                console.log("API Response:", response.data);

                if (Array.isArray(response.data.destinations)) {
                    setDestinations(response.data.destinations);
                } else {
                    console.error("Expected an array but got:", response.data);
                }
            } catch (error) {
                console.error("Error fetching destinations:", error.response?.data || error.message);
            }
        };

        fetchDestinations();
    }, [filters]);

    return (
        <div>
            <Filters onFilterChange={setFilters} />
            <div className="destination-list">
                {destinations.length > 0 ? (
                    destinations.map((destination) => (
                        <DestinationCard key={destination._id} destination={destination} />
                    ))
                ) : (
                    <p>No destinations found.</p>
                )}
            </div>
        </div>
    );
};

export default DestinationList;
