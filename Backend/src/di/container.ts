import "reflect-metadata";
import { container } from "tsyringe";
import { MovieService } from "../service/movieService";
import { MovieRoutes } from "../routes/movie.routes";
import { MovieController } from "../controller/movieController";
import { App } from "../app";

container.registerSingleton("MovieController", MovieController);
container.registerSingleton("IMovieService", MovieService);
container.registerSingleton("MovieRoutes", MovieRoutes);
container.registerSingleton("IApp", App);

export { container };
