import React from "react";
import { MovieCard } from "./MovieCard";
import type { IMovieListProps } from "../types/component.types";

export const MovieList: React.FC<IMovieListProps> = ({
  movies,
  favorites,
  onToggleFavorite,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {movies.map((movie, index) => {
        const isFavorite = favorites.some((f) => f.imdbID === movie.imdbID);

        return (
          <MovieCard
            key={index}
            title={movie.title}
            yearOfRelease={movie.yearOfRelease}
            poster={movie.poster}
            isFavorite={isFavorite}
            onToggleFavorite={() => onToggleFavorite(movie)}
          />
        );
      })}
    </div>
  );
};
