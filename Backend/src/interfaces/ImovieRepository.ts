import { IFavoriteMovieDto } from "./Dto/favouritesDto";

export interface IMovieRepository {
  addToFavorites(
    sessionId: string,
    movie: IFavoriteMovieDto
  ): IFavoriteMovieDto | null;
  removeFromFavorites(sessionId: string, imdbID: string): string | null;
}
