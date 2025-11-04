import express, { Router } from "express";
import { MovieController } from "../controller/movieController";
import { inject, injectable } from "tsyringe";

@injectable()
export class MovieRoutes {
  private router: Router;

  constructor(
    @inject("MovieController") private _movieController: MovieController
  ) {
    this.router = express.Router();
    this.setUpRoutes();
  }

  private setUpRoutes() {
    this.router.get(
      "/search",
      this._movieController.getMovie.bind(this._movieController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
