import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ItineraryList from "../components/itineraries/ItineraryList";
import Reviews from "../components/reviews";

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(`https://tripsage.onrender.com/destinations/get/${id}`);
        setDestination(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destination details:", error);
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (!destination) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="mt-4 text-xl font-medium text-gray-700">Destination not found.</h3>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white shadow-sm rounded-lg">
      <div className="lg:flex">
        {/* Left column - Image */}
        <div className="lg:w-1/2 mb-6 lg:mb-0 lg:pr-8">
          <div className="relative h-80 rounded-lg overflow-hidden shadow-md">
            <img 
              src={destination.images[0]} 
              alt={destination.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow text-sm font-medium text-indigo-600">
              {destination.category}
            </div>
          </div>
        </div>
        
        {/* Right column - Info */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{destination.name}</h2>
          
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-600">{destination.location}</span>
          </div>
          
          <p className="text-gray-700 mb-5 leading-relaxed">{destination.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-blue-800 font-medium">Best Time to Visit</p>
              <p className="text-gray-800">{destination.bestTimeToVisit}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm text-green-800 font-medium">Average Cost</p>
              <p className="text-gray-800">${destination.averageCost}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-800 mb-2">Activities</h4>
            <div className="flex flex-wrap gap-2">
              {destination.activities.map((activity, index) => (
                <span 
                  key={index} 
                  className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mt-10">
        <nav className="flex space-x-8">
          <button 
            onClick={() => setActiveTab("details")} 
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "details" 
                ? "border-indigo-500 text-indigo-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Details
          </button>
          <button 
            onClick={() => setActiveTab("reviews")} 
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "reviews" 
                ? "border-indigo-500 text-indigo-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Reviews
          </button>
          <button 
            onClick={() => setActiveTab("itineraries")} 
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "itineraries" 
                ? "border-indigo-500 text-indigo-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Itineraries
          </button>
        </nav>
      </div>

      {/* Content Based on Active Tab */}
      <div className="py-6">
        {activeTab === "details" && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Destination Details</h3>
              <div className="flex">
                <span className="text-yellow-500 flex">
                  {"★★★★☆"}
                </span>
                <span className="text-gray-600 ml-2">()</span>
              </div>
            </div>
            <div className="prose text-gray-700 max-w-none">
              <p>Experience the beauty and wonder of {destination.name}. Located in {destination.location}, this destination offers a unique blend of adventure, culture, and relaxation.</p>
              <p>Explore the various activities including {destination.activities.join(", ")} during your visit.</p>
            </div>
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="bg-white">
            <Reviews destinationId={id} />
          </div>
        )}
        {activeTab === "itineraries" && (
          <div className="bg-white">
            <ItineraryList destinationId={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationDetail;