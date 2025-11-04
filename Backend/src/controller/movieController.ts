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
}
