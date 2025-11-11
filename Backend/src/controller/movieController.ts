import { Request, Response } from "express";
import { movieSearchSchema } from "../validations/movieValidations";
import { HttpStatusCodes } from "../utils/httpstatuscode";
import { injectable, inject } from "tsyringe";
import { IMovieService } from "../interfaces/ImovieService";

@injectable()
export class MovieController {
  constructor(@inject("IMovieService") private _movieService: IMovieService) {}

  async getMovie(req: Request, res: Response): Promise<void> {
    try {
      console.log("entering to the getmovie function in the movie controller");
      console.log("search input from the front end:", req.query);

      const validationResult = movieSearchSchema.safeParse(req.query);

      if (!validationResult.success) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
          error: validationResult.error.issues[0]?.message,
        });
        return;
      }

      const { search } = validationResult.data;
      console.log("Validated search:", search);
      const result = await this._movieService.getMovie(search);
      console.log("result from the movie controller:", result);
      res.status(HttpStatusCodes.OK).json(result);
    } catch (error) {
      console.log("error occurred while fetching the movie:", error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong while processing the movie search",
      });
    }
  }

  async addToFavorites(req: Request, res: Response): Promise<void> {
    try {
      console.log("Add to favorites request:", req.body);

      const { sessionId, movie } = req.body;

      if (!sessionId || !movie) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
          success: false,
          message: "sessionId and movie are required",
        });
        return;
      }

      if (!movie.imdbID || !movie.title || !movie.yearOfRelease) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Invalid movie data",
        });
        return;
      }

      const result = await this._movieService.addToFavorites(sessionId, movie);

      const statusCode = result.success
        ? HttpStatusCodes.OK
        : HttpStatusCodes.BAD_REQUEST;

      res.status(statusCode).json(result);
    } catch (error) {
      console.error("Error in addToFavorites controller:", error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong while adding to favorites",
      });
    }
  }

  async removeFromFavorites(req: Request, res: Response): Promise<void> {
    try {
      console.log("Remove from favorites request:", req.params, req.body);

      const { sessionId } = req.body;
      const { imdbID } = req.params;

      if (!sessionId || !imdbID) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
          success: false,
          message: "sessionId and imdbID are required",
        });
        return;
      }

      const result = await this._movieService.removeFromFavorites(
        sessionId,
        imdbID
      );

      const statusCode = result.success
        ? HttpStatusCodes.OK
        : HttpStatusCodes.BAD_REQUEST;

      res.status(statusCode).json(result);
    } catch (error) {
      console.error("Error in removeFromFavorites controller:", error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong while removing from favorites",
      });
    }
  }
}
