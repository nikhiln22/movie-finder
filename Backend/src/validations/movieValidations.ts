import { z } from "zod";

export const movieSearchSchema = z.object({
  search: z
    .string()
    .min(1, "Search query is required")
    .min(2, "Search query must be at least 2 characters"),
});
