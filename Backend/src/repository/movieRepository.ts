import { injectable, inject } from "tsyringe";
import { IFavoriteMovieDto } from "../interfaces/Dto/favouritesDto";
import { IMovieRepository } from "../interfaces/ImovieRepository";
import { IFavoritesStore } from "../interfaces/ifavouriteStore";

@injectable()
export class MovieRepository implements IMovieRepository {
  constructor(
    @inject("IFavoritesStore") private _favouriteStore: IFavoritesStore
  ) {}

  addToFavorites(
    sessionId: string,
    movie: IFavoriteMovieDto
  ): IFavoriteMovieDto | null {
    return this._favouriteStore.addFavorite(sessionId, movie);
  }

  removeFromFavorites(sessionId: string, imdbID: string): string | null {
    return this._favouriteStore.removeFavorite(sessionId, imdbID);
  }
}
