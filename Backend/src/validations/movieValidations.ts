import { z } from "zod";

export const movieSearchSchema = z.object({
  search: z
    .string()
    .min(1, "Search query is required")
    .min(2, "Search query must be at least 2 characters"),
});

export const addToFavoritesSchema = z.object({
  sessionId: z.string().uuid("Invalid session ID"),
  movie: z.object({
    imdbID: z.string().min(1, "imdbID is required"),
    title: z.string().min(1, "title is required"),
    yearOfRelease: z.string().min(1, "yearOfRelease is required"),
    poster: z.string().url(),
  }),
});

export const removeFromFavoritesSchema = z.object({
  sessionId: z.string().uuid("Invalid session ID"),
  imdbId: z.string().min(1, "imdbId is required"),
});
