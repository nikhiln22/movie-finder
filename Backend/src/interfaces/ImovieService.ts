import { IFavoriteMovieDto } from "./Dto/favouritesDto";
import { IMovieServiceDto } from "./Dto/movieServiceDto";

export interface IMovieService {
  getMovie(
    search: string,
    page: number
  ): Promise<{
    success: boolean;
    message: string;
    data?: IMovieServiceDto[];
  }>;
  addToFavorites(
    sessionId: string,
    movie: IFavoriteMovieDto
  ): Promise<{ success: boolean; message: string }>;

  removeFromFavorites(
    sessionId: string,
    imdbID: string
  ): Promise<{ success: boolean; message: string }>;
  getFavorites(
    sessionId: string
  ): Promise<{ success: boolean; data: IFavoriteMovieDto[] }>;
}
