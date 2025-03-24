import React, { useState } from "react";

const Filters = ({ onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [minCost, setMinCost] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const [sort, setSort] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = () => {
    console.log("Filters being applied:", { search, category, location, minCost, maxCost, sort });
    onFilterChange({ search, category, location, minCost, maxCost, sort });
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    setMinCost("");
    setMaxCost("");
    setSort("");
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 text-sm font-medium flex items-center focus:outline-none"
        >
          {isExpanded ? (
            <>
              <span>Hide filters</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
              </svg>
            </>
          ) : (
            <>
              <span>Show all filters</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </>
          )}
        </button>
      </div>

      <div className="flex flex-wrap -mx-2">
        <div className="w-full px-2 mb-4">
          <div className="relative">
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className={`w-full ${isExpanded ? 'block' : 'hidden'} md:flex flex-wrap`}>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
            >
              <option value="">All Categories</option>
              <option value="Beach">Beach</option>
              <option value="Mountain">Mountain</option>
              <option value="City">City</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="relative">
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <input
                type="text"
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
            >
              <option value="">Sort By</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="ratings">Ratings</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/2 px-2 mb-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <input
                  type="number"
                  placeholder="Min Cost"
                  value={minCost}
                  onChange={(e) => setMinCost(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="w-1/2">
                <input
                  type="number"
                  placeholder="Max Cost"
                  value={maxCost}
                  onChange={(e) => setMaxCost(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex flex-wrap justify-end gap-4 mt-2 ${isExpanded ? 'block' : 'hidden'} md:flex`}>
        <button 
          onClick={resetFilters}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
        >
          Reset
        </button>
        <button 
          onClick={handleFilterChange}
          className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;