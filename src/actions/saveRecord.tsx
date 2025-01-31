"use server";

import { numberSchema, simonSchema, tileSchema } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const saveTileRecord = async (values: z.infer<typeof tileSchema>) => {
  try {
    await prisma.tilesRecord.create({
      data: values,
    });
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to save record");
  }
};

export const saveNumberRecord = async (
  values: z.infer<typeof numberSchema>
) => {
  try {
    await prisma.numbersRecord.create({
      data: values,
    });
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to save record");
  }
};

export const saveSimonRecord = async (values: z.infer<typeof simonSchema>) => {
  try {
    await prisma.simonRecord.create({
      data: values,
    });
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to save record");
  }
};
