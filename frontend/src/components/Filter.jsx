import React, { useState } from "react";

const Filters = ({ onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [minCost, setMinCost] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const [sort, setSort] = useState("");

  const handleFilterChange = () => {
    console.log("Filters being applied:", { search, category, location, minCost, maxCost, sort });
    onFilterChange({ search, category, location, minCost, maxCost, sort });
  };

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search destinations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Beach">Beach</option>
        <option value="Mountain">Mountain</option>
        <option value="City">City</option>
      </select>

      <input
        type="text"
        placeholder="Location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="number"
        placeholder="Min Cost"
        value={minCost}
        onChange={(e) => setMinCost(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Cost"
        value={maxCost}
        onChange={(e) => setMaxCost(e.target.value)}
      />

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort By</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="ratings">Ratings</option>
      </select>

      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

export default Filters;
