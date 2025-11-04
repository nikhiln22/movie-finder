import React, { useState } from "react";
import type { ISearchBarProps } from "../types/component.types";

export const SearchBar: React.FC<ISearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center gap-3 mb-8">
      <input
        type="text"
        placeholder="Search the movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
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