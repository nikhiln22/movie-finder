import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchMovies = async (query: string) => {
  try {
    console.log("entering to the fetchmovies service call");
    const response = await axios.get(`${BASE_URL}/?search=${query}`);
    return response.data;
  } catch (error) {
    console.log("error occured while fetching the movies:", error);
  }
};
