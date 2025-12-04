import type { IMovie } from "../model/movie";

export interface IMovieListProps {
  movies: IMovie[];
  favorites: IMovie[];
  onToggleFavorite: (movie: IMovie) => void;
}

export interface ISearchBarProps {
  onSearch: (query: string) => void;
}

export interface IMovieCardProps {
  title: string;
  yearOfRelease: string;
  poster: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export interface SkeletonListProps {
  count: number;
}

export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
