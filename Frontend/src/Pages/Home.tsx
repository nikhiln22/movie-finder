import { useEffect, useState } from "react";
import { SearchBar } from "../component/SearchBar";
import { MovieList } from "../component/MovieList";
import { fetchMovies } from "../services/movieServices";
import type { IMovie } from "../model/movie";
import { useDebounce } from "../hooks/debounce";
import { SkeletonList } from "../component/SkeletonList";
import toast from "react-hot-toast";

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery, 600);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedQuery.trim()) return;

      setLoading(true);

      try {
        const response = await fetchMovies(debouncedQuery);

        if (response.success) {
          setMovies(response.data || []);
          if (response.data && response.data.length > 0) {
            toast.success(`Found ${response.data.length} movies`);
          }
        } else {
          const message = response.message || "Movie not found!";

          if (message === "Movie not found!") {
            toast.error("No movie found with that name");
          } else if (message === "Too many results.") {
            toast.error("Too many results. Please be more specific");
          } else {
            toast.error(message);
          }

          setMovies([]);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch movies. Please try again.");
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

      {loading && <SkeletonList count={movies.length || 6} />}

      {!loading && movies.length === 0 && (
        <p className="text-center text-xl text-gray-400">
          Search for a movie to get started
        </p>
      )}

      {!loading && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};
