import express, { type Express } from "express";
import { config } from "./config/env.config";
import cors from "cors";
import { MovieRoutes } from "./routes/movie.routes";
import { inject, injectable } from "tsyringe";
import { IApp } from "./interfaces/Iapp";

@injectable()
export class App implements IApp {
  public app: Express;

  constructor(@inject("MovieRoutes") private movieRoutes: MovieRoutes) {
    this.app = express();
    this.setupMiddlewares();
    this.configureRoutes();
  }

  private setupMiddlewares() {
    const corsOptions = {
      origin: config.CLIENT_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    };
    this.app.use(cors(corsOptions));
  }

  private configureRoutes() {
    this.app.use("/api/movies", this.movieRoutes.getRouter());
  }

  public listen(): void {
    this.app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  }
}
