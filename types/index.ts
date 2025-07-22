import { number, z } from "zod";
import { insterProductSchema } from "@/lib/validators";
import { Rationale } from "next/font/google";

export type Product = z.infer<typeof insterProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
};
