import axios from "axios";
import { getOrCreateSessionId } from "../utils/session";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchMovies = async (query: string) => {
  try {
    console.log("entering to the fetchmovies service call");
    const response = await axios.get(
      `${BASE_URL}/api/movies/search?search=${query}`
    );
    return response.data;
  } catch (error) {
    console.log("error occured while fetching the movies:", error);
  }
};

export const fetchFavourites = async () => {
  try {
    const sessionId = getOrCreateSessionId();

    const response = await axios.get(`${BASE_URL}/api/movies/favourites`, {
      params: { sessionId },
    });

    return response.data;
  } catch (error) {
    console.log("Error while fetching favourites:", error);
    return { success: false, data: [], message: "Failed to fetch favourites" };
  }
};

export const addToFavourites = async (movie: {
  imdbID: string;
  title: string;
  yearOfRelease: string;
  poster: string;
}) => {
  try {
    console.log("entering to the addToFavourites service call");

    const sessionId = getOrCreateSessionId();

    const response = await axios.post(`${BASE_URL}/api/movies/favourites`, {
      movie,
      sessionId,
    });
    return response.data;
  } catch (error) {
    console.log("error occurred while adding to favourites:", error);
    throw error;
  }
};

export const removeFromFavourites = async (imdbID: string) => {
  try {
    console.log(
      `entering to the removeFromFavourites service call with ${imdbID}`
    );
    const sessionId = getOrCreateSessionId();
    const response = await axios.delete(
      `${BASE_URL}/api/movies/favourites/${imdbID}`,
      {
        params: { sessionId },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error occurred while removing from favourites:", error);
    throw error;
  }
};
