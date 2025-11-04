import React, { useState } from "react";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("api called with the search:", query);
  };

  return (
    <div className="flex justify-center gap-3 mb-8">
      <input
        type="text"
        placeholder="Search the movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 w-72 rounded-md text-white border border-white bg-transparent focus:outline-none"
      />

      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
