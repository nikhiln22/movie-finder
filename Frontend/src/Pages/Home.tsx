import React from "react";
import SearchBar from "../component/SearchBar";
import MovieList from "../component/MovieList";

const Home: React.FC = () => {
  const sampleMovies = [
    {
      title: "Inception",
      year: "2010",
      poster: "https://m.media-amazon.com/images/I/51oDLeJ6IPL._AC_.jpg",
    },
    {
      title: "Interstellar",
      year: "2014",
      poster: "https://m.media-amazon.com/images/I/71n9Z6QCx9L._AC_SL1188_.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-center text-4xl font-bold mb-6">Movie Finder</h1>
      <SearchBar />
      <MovieList movies={sampleMovies} />
    </div>
  );
};

export default Home;
