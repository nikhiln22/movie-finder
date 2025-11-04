import { IMovieServiceDto } from "./Dto/movieServiceDto";

export interface IMovieService {
  getMovie(search: string): Promise<{
    success: boolean;
    message: string;
    data?: IMovieServiceDto[];
  }>;
}
