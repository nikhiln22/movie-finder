import "reflect-metadata";
import { container } from "tsyringe";
import { MovieService } from "../service/movieService";
import { MovieRoutes } from "../routes/movie.routes";
import { MovieController } from "../controller/movieController";
import { MovieRepository } from "../repository/movieRepository";
import { App } from "../app";
import { FavoritesStore } from "../storage/favouriteStore";

container.registerSingleton("MovieController", MovieController);
container.registerSingleton("IMovieService", MovieService);
container.registerSingleton("IFavoritesStore", FavoritesStore);
container.registerSingleton("MovieRoutes", MovieRoutes);
container.registerSingleton("IMovieRepository", MovieRepository);
container.registerSingleton("IApp", App);

export { container };
