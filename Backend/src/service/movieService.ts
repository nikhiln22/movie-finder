import { IMovieServiceDto } from "../interfaces/Dto/movieServiceDto";
import { IMovieService } from "../interfaces/ImovieService";
import { injectable, inject } from "tsyringe";
import axios from "axios";
import { config } from "../config/env.config";

@injectable()
export class MovieService implements IMovieService {
  constructor() {}
  async getMovie(
    search: string
  ): Promise<{ success: boolean; message: string; data?: IMovieServiceDto[] }> {
    try {
      console.log("entering to the getmovie function inside the movie service");
      console.log("received data in the service:", search);
      const response = await axios.get(
        `${config.OMDB_BASE_URL}?apikey=${config.OMDB_API_KEY}&s=${search}`
      );
      console.log("fetched movie details from the omdb api");
      if (response.data.Response === "False") {
        return {
          success: false,
          message: response.data.Error || "No movies found",
        };
      }
      const movies = response.data.Search.map((movie: any) => ({
        imdbID: movie.imdbID,
        title: movie.Title,
        yearOfRelease: movie.Year,
        poster: movie.Poster,
      })) as IMovieServiceDto[];

      console.log("transformed movie result:", movies);

      return {
        success: true,
        message: "Movies fetched successfully",
        data: movies,
      };
    } catch (error) {
      return {
        success: false,
        message: "An unexpected error occurred",
      };
    }
  }
}
