import { number, z } from "zod";
import {
  insterProductSchema,
  insertCartSchema,
  cartItemSchema,
  shippingAddressSchema,
} from "@/lib/validators";
import { Rationale } from "next/font/google";

export type Product = z.infer<typeof insterProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>; 
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;