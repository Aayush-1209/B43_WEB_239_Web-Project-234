import { useAuth } from "../../context/AuthContext";

const ItineraryCard = ({ itinerary, onDelete }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition duration-200">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">{itinerary.title}</h4>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {new Date(itinerary.date).toLocaleDateString()}
          </span>
        </div>
        
        <div className="space-y-2 mt-3">
          <div className="flex items-start">
            <span className="text-gray-600 font-medium w-24">Activities:</span>
            <span className="text-gray-700 flex-1">
              {itinerary.activities.join(", ")}
            </span>
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-600 font-medium w-24">Created by:</span>
            <span className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold mr-2">
                {itinerary.user?.name ? itinerary.user.name.charAt(0).toUpperCase() : "?"}
              </div>
              <span className="text-gray-700">{itinerary.user?.name || "Unknown"}</span>
            </span>
          </div>
        </div>

        {user && (user.role === "admin" || user.id === itinerary.userId) && (
          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
            <button 
              onClick={() => onDelete(itinerary._id)}
              className="flex items-center text-red-600 hover:text-red-800 font-medium text-sm transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryCard;