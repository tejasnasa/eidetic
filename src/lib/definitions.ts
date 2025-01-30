import { z } from "zod";

export const nameSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .trim(),
  time: z.number(),
});
