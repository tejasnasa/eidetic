"use server";

import { nameSchema } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const saveTileRecord = async (values: z.infer<typeof nameSchema>) => {
  try {
    await prisma.tilesRecord.create({
      data: values,
    });
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to save record");
  }
};
