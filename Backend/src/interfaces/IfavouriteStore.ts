import { IFavoriteMovieDto } from "./Dto/favouritesDto";

export interface IFavoritesStore {
  addFavorite(
    sessionId: string,
    movie: IFavoriteMovieDto
  ): IFavoriteMovieDto | null;
  removeFavorite(sessionId: string, imdbID: string): string | null;
}
