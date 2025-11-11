import { injectable } from "tsyringe";
import { IFavoriteMovieDto } from "../interfaces/Dto/favouritesDto";
import { IFavoritesStore } from "../interfaces/IfavouriteStore";

@injectable()
export class FavoritesStore implements IFavoritesStore {
  private store: Map<string, IFavoriteMovieDto[]>;

  constructor() {
    this.store = new Map<string, IFavoriteMovieDto[]>();
  }

  addFavorite(
    sessionId: string,
    movie: IFavoriteMovieDto
  ): IFavoriteMovieDto | null {
    const favorites = this.store.get(sessionId) || [];

    const exists = favorites.some((fav) => fav.imdbID === movie.imdbID);
    if (exists) {
      return null;
    }

    favorites.push(movie);
    this.store.set(sessionId, favorites);

    console.log(
      `Added movie ${movie.title} to favorites for session ${sessionId}`
    );

    return movie;
  }

  removeFavorite(sessionId: string, imdbID: string): string | null {
    const favorites = this.store.get(sessionId) || [];

    const index = favorites.findIndex((fav) => fav.imdbID === imdbID);

    if (index === -1) {
      return null;
    }

    favorites.splice(index, 1);
    this.store.set(sessionId, favorites);

    console.log(
      `Removed movie ${imdbID} from favorites for session ${sessionId}`
    );

    return imdbID;
  }

  getFavorites(sessionId: string): IFavoriteMovieDto[] {
    return this.store.get(sessionId) || [];
  }
}
