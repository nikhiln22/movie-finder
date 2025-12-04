export interface IMovieServiceDto {
  imdbID: string;
  title: string;
  yearOfRelease: string;
  poster: string;
}

export interface IOmdbMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
