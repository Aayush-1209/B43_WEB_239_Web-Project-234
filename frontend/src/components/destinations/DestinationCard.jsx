import { useState } from "react";
import { Link } from "react-router-dom";
import ItineraryForm from "../itineraries/ItineraryForm";
import { useAuth } from "../../context/AuthContext";

const DestinationCard = ({ destination, hidePlanTrip }) => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const nextImage = () => {
    if (destination.images?.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === destination.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (destination.images?.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? destination.images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Gallery with Navigation */}
      <div className="relative h-48 md:h-64 overflow-hidden bg-gray-200">
        {destination.images?.length > 0 ? (
          <>
            <img 
              src={destination.images[currentImageIndex]} 
              alt={`${destination.name}`}
              className="w-full h-full object-cover"
            />
            
            {destination.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md">
                  {currentImageIndex + 1} / {destination.images.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{destination.name}</h3>
        
        <div className="mb-4">
          <div className="flex items-start mb-2">
            <svg className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-700">{destination.location}</span>
          </div>
          
          <div className="flex items-start mb-2">
            <svg className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-700">Best time: {destination.bestTimeToVisit}</span>
          </div>
          
          <div className="flex items-start mb-2">
            <svg className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-700">Avg. Cost: ${destination.averageCost}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Activities:</h4>
          <div className="flex flex-wrap gap-2">
            {destination.activities.map((activity, index) => (
              <span 
                key={index} 
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            {destination.category}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Link 
            to={user ? `/destinations/${destination._id}` : "/login"}
            className="flex-1"
          >
            <button className={`w-full py-2 px-4 rounded-md ${
              user 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            } font-medium transition-colors`}>
              {user ? "View Details" : "Login to View"}
            </button>
          </Link>
          
          {!hidePlanTrip && user && (
            <button 
              onClick={() => setShowForm(!showForm)} 
              className={`flex-1 py-2 px-4 rounded-md ${
                showForm 
                  ? "bg-red-500 hover:bg-red-600 text-white" 
                  : "bg-green-600 hover:bg-green-700 text-white"
              } font-medium transition-colors`}
            >
              {showForm ? "Cancel" : "Plan Trip"}
            </button>
          )}
        </div>
      </div>
      
      {showForm && (
        <div className="px-4 pb-4">
          <ItineraryForm destinationId={destination._id} onClose={handleCloseForm} />
        </div>
      )}
    </div>
  );
};

export default DestinationCard;