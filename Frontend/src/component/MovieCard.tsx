import React from "react";

interface MovieCardProps {
  title: string;
  year: string;
  poster: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, year, poster }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md hover:scale-105 transition-transform cursor-pointer">
      <img
        src={poster}
        alt={title}
        className="w-full h-64 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-3">{title}</h2>
      <p className="text-sm text-gray-400">{year}</p>
    </div>
  );
};

export default MovieCard;
