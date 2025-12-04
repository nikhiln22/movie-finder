import { getOrCreateSessionId } from "../utils/session";
import { axiosInstance } from "../config/axios.config";
import { MOVIE_API } from "../constants/apiRoutes";

export const fetchMovies = async (query: string, page: number) => {
  try {
    console.log("entering to the fetchmovies service call");
    const response = await axiosInstance.get(
      `${MOVIE_API}/search?search=${query}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log("error occured while fetching the movies:", error);
  }
};

export const fetchFavourites = async () => {
  try {
    const sessionId = getOrCreateSessionId();

    const response = await axiosInstance.get(`${MOVIE_API}/favourites`, {
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

    const response = await axiosInstance.post(`${MOVIE_API}/favourites`, {
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
    const response = await axiosInstance.delete(
      `${MOVIE_API}/favourites/${imdbID}`,
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
