import React from "react";
import MovieCard from "./MovieCard";
import type { IMovieListProps } from "../types/component.types";

const MovieList: React.FC<IMovieListProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {movies.map((movie, index) => (
        <MovieCard
          key={index}
          title={movie.title}
          year={movie.year}
          poster={movie.poster}
        />
      ))}
    </div>
  );
};

export default MovieList;
