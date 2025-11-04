import { useEffect, useState } from "react";
import { SearchBar } from "../component/SearchBar";
import { MovieList } from "../component/MovieList";
import { fetchMovies } from "../services/movieServices";
import type { IMovie } from "../model/movie";
import { useDebounce } from "../hooks/debounce";
import { SkeletonList } from "../component/SkeletonList";

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery, 600);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedQuery.trim()) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetchMovies(debouncedQuery);
        setMovies(response.data || []);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch movies. Please try again.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-center text-4xl font-bold mb-6">Movie Finder</h1>

      <SearchBar onSearch={handleSearch} />
      {loading && <SkeletonList count={movies.length} />}
      {error && <p className="text-center text-xl text-red-500">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="text-center text-xl text-gray-400">
          Search for a movie to get started
        </p>
      )}

      {!loading && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};
