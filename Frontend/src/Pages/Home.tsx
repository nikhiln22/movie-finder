import { useEffect, useState } from "react";
import { SearchBar } from "../component/SearchBar";
import { MovieList } from "../component/MovieList";
import {
  fetchMovies,
  addToFavourites,
  removeFromFavourites,
  fetchFavourites,
} from "../services/movieServices";
import type { IMovie } from "../model/movie";
import { useDebounce } from "../hooks/debounce";
import { SkeletonList } from "../component/SkeletonList";
import toast from "react-hot-toast";

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [favorites, setFavorites] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery, 600);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const loadFavorites = async () => {
      const response = await fetchFavourites();
      if (response.success) {
        setFavorites(response.data);
      }
    };
    loadFavorites();
  }, []);

  const handleToggleFavorite = async (movie: IMovie) => {
    const isAlreadyFav = favorites.some((f) => f.imdbID === movie.imdbID);
    console.log("isAlreadyFav in the home page:", isAlreadyFav);

    if (isAlreadyFav) {
      const result = await removeFromFavourites(movie.imdbID);

      if (result.success) {
        setFavorites((prev) => prev.filter((f) => f.imdbID !== movie.imdbID));
        toast.success("Removed from favourites");
      } else {
        toast.error("Failed to remove from favourites");
      }
    } else {
      const result = await addToFavourites(movie);

      if (result.success) {
        setFavorites((prev) => [...prev, movie]);
        toast.success("Added to favourites");
      } else {
        toast.error("Failed to add to favourites");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedQuery.trim()) {
        setMovies([]);
        return;
      }

      setLoading(true);

      try {
        const response = await fetchMovies(debouncedQuery);

        if (response.success) {
          setMovies(response.data || []);
        } else {
          setMovies([]);
          toast.error(response.message || "Movie not found!");
        }
      } catch {
        toast.error("Failed to fetch movies!");
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

      {loading && <SkeletonList count={6} />}

      {!loading && movies.length > 0 && (
        <MovieList
          movies={movies}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {!loading && movies.length === 0 && (
        <p className="text-center text-xl text-gray-400">
          Search for a movie to get started
        </p>
      )}
    </div>
  );
};
