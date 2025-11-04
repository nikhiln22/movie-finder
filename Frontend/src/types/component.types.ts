import type { IMovie } from "../model/movie";

export interface IMovieListProps {
  movies: IMovie[];
}

export interface ISearchBarProps {
  onSearch: (query: string) => void;
}

export interface IMovieCardProps {
  title: string;
  yearOfRelease: string;
  poster: string;
}

export interface SkeletonListProps {
  count: number;
}
