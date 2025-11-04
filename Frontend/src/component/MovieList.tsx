import React from "react";
import { MovieCard } from "./MovieCard";
import type { IMovieListProps } from "../types/component.types";

export const MovieList: React.FC<IMovieListProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {movies.map((movie, index) => (
        <MovieCard
          key={index}
          title={movie.title}
          yearOfRelease={movie.yearOfRelease}
          poster={movie.poster}
        />
      ))}
    </div>
  );
};
