import React, { useState } from "react";
import { Film, Heart } from "lucide-react";
import type { IMovieCardProps } from "../types/component.types";

export const MovieCard: React.FC<IMovieCardProps> = ({
  title,
  yearOfRelease,
  poster,
  isFavorite,
  onToggleFavorite,
}) => {
  const [imageError, setImageError] = useState(false);

  const formatYear = (year: string) => {
    if (!year) return "N/A";

    if (year.includes("–") || year.includes("-")) {
      const [start, end] = year.split(/[–-]/);
      return end.trim() ? `${start.trim()}–${end.trim()}` : `${start.trim()}–`;
    }

    return year;
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md cursor-pointer">
      <div className="relative aspect-2/3 bg-gray-700">
        {!imageError && poster !== "N/A" ? (
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <Film className="w-16 h-16 text-gray-500 mx-auto mb-2" />
            <p className="text-gray-400 text-xs">No Poster</p>
          </div>
        )}

        <button
          onClick={onToggleFavorite}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "text-red-500 fill-red-500" : "text-white"
            }`}
          />
        </button>
      </div>

      <div className="p-3">
        <h2
          className="text-sm font-semibold text-white line-clamp-1 mb-1"
          title={title}
        >
          {title}
        </h2>
        <p className="text-xs text-yellow-400">{formatYear(yearOfRelease)}</p>
      </div>
    </div>
  );
};
