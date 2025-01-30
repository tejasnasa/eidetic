import { z } from "zod";

export const tileSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .trim(),
  time: z.number(),
});

export const numberSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .trim(),
  level: z.number(),
});

export const simonSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .trim(),
  level: z.number(),
});