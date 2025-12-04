import React, { useState } from "react";
import type { ISearchBarProps } from "../types/component.types";

export const SearchBar: React.FC<ISearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const validateQuery = (value: string) => {
    if (value.length > 0 && value.length < 3) {
      return "Search query must be at least 3 characters";
    }
    if (value.length > 100) {
      return "Search query must not exceed 100 characters";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const validationError = validateQuery(value);
    setError(validationError);

    if (!validationError) {
      onSearch(value);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 mb-8">
      <div className="flex flex-col">
        <input
          type="search"
          placeholder="Search the movie..."
          value={query}
          onChange={handleChange}
          className={`px-4 py-2 w-72 rounded-md text-white border ${
            error ? "border-red-500" : "border-white"
          } bg-transparent focus:outline-none`}
        />

        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
      </div>
    </div>
  );
};
