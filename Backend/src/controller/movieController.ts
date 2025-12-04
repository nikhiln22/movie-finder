import { Request, Response } from "express";
import {
  addToFavoritesSchema,
  movieSearchSchema,
  removeFromFavoritesSchema,
} from "../validations/movieValidations";
import { HttpStatusCodes } from "../utils/httpstatuscode";
import { injectable, inject } from "tsyringe";
import { IMovieService } from "../interfaces/ImovieService";

@injectable()
export class MovieController {
  constructor(@inject("IMovieService") private _movieService: IMovieService) {}

  async getMovie(req: Request, res: Response): Promise<void> {
    try {
      console.log("entering to the getmovie function in the movie controller");

      const validationResult = movieSearchSchema.safeParse(req.query);
      const page = req.query.page ? Number(req.query.page) : 1;

      if (!validationResult.success) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
          error: validationResult.error.issues[0]?.message,
        });
        return;
      }

      const { search } = validationResult.data;

      const result = await this._movieService.getMovie(search, page);

      res.status(HttpStatusCodes.OK).json(result);
    } catch (error) {
      console.log("error occurred while fetching the movie:", error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong while processing the movie search",
      });
    }
  }

  async getFavorites(req: Request, res: Response): Promise<void> {
    try {
      const { sessionId } = req.query;

      console.log("Fetching favourites for session:", sessionId);

      if (!sessionId) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
          success: false,
          message: "sessionId is required",
        });
        return;
      }

      const result = await this._movieService.getFavorites(sessionId as string);

      const statusCode = result.success
        ? HttpStatusCodes.OK
        : HttpStatusCodes.BAD_REQUEST;

      res.status(statusCode).json(result);
    } catch (error) {
      console.error("Error in getFavorites controller:", error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong while fetching favorites",
      });
    }
  }

  async addToFavorites(req: Request, res: Response): Promise<void> {
    try {
      console.log("Add to favorites request:", req.body);

      const parsed = addToFavoritesSchema.safeParse(req.body);

      if (!parsed.success) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
          success: false,
          message: parsed.error.issues[0]?.message,
        });
        return;
      }

      const { sessionId, movie } = parsed.data;

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
      console.log("Remove from favorites request....");

      const toValidate = {
        sessionId: req.query.sessionId as string,
        imdbId: req.params.imdbId as string,
      };

      const parsed = removeFromFavoritesSchema.safeParse(toValidate);

      if (!parsed.success) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
          success: false,
          message: parsed.error.issues[0]?.message,
        });
        return;
      }

      const { sessionId, imdbId } = parsed.data;

      console.log(`sessionId : ${sessionId}, imdbID : ${imdbId}`);

      const result = await this._movieService.removeFromFavorites(
        sessionId,
        imdbId
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
