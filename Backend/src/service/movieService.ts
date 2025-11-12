import { IMovieServiceDto } from "../interfaces/Dto/movieServiceDto";
import { IMovieService } from "../interfaces/ImovieService";
import { injectable, inject } from "tsyringe";
import axios from "axios";
import { config } from "../config/env.config";
import { IFavoriteMovieDto } from "../interfaces/Dto/favouritesDto";
import { IMovieRepository } from "../interfaces/ImovieRepository";

@injectable()
export class MovieService implements IMovieService {
  constructor(
    @inject("IMovieRepository") private _movieRepository: IMovieRepository
  ) {}

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

  async addToFavorites(
    sessionId: string,
    movie: IFavoriteMovieDto
  ): Promise<{ success: boolean; message: string; imdbID?: string }> {
    try {
      console.log("Adding to favorites:", { sessionId, movie });

      const result = this._movieRepository.addToFavorites(sessionId, movie);

      if (result === null) {
        return {
          success: false,
          message: "Movie is already in favorites",
        };
      }

      return {
        success: true,
        message: "Movie added to favorites successfully",
        imdbID: result.imdbID,
      };
    } catch (error) {
      console.error("Error adding to favorites:", error);
      return {
        success: false,
        message: "Failed to add movie to favorites",
      };
    }
  }

  async removeFromFavorites(
    sessionId: string,
    imdbID: string
  ): Promise<{ success: boolean; message: string; imdbID?: string }> {
    try {
      console.log("Removing from favorites:", { sessionId, imdbID });

      const result = this._movieRepository.removeFromFavorites(
        sessionId,
        imdbID
      );

      console.log(
        "result in the remove from favourites in the movie service:",
        result
      );

      if (result === null) {
        return {
          success: false,
          message: "Movie not found in favorites",
        };
      }

      return {
        success: true,
        message: "Movie removed from favorites successfully",
        imdbID: result,
      };
    } catch (error) {
      console.error("Error removing from favorites:", error);
      return {
        success: false,
        message: "Failed to remove movie from favorites",
      };
    }
  }

  async getFavorites(
    sessionId: string
  ): Promise<{ success: boolean; data: IFavoriteMovieDto[] }> {
    try {
      console.log("Fetching favorites for:", sessionId);

      const favorites = this._movieRepository.getFavorites(sessionId);

      console.log(
        "favourites in getFavourites function in movieService:",
        favorites
      );

      return {
        success: true,
        data: favorites,
      };
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return {
        success: false,
        data: [],
      };
    }
  }
}
