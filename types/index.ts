import { number, z } from "zod";
import {
  insterProductSchema,
  insertCartSchema,
  cartItemSchema,
  shippingAddressSchema,
  insertOrderSchema,
  insertOrderItemSchema,
  paymentResultSchema,
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
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDeliverd: boolean;
  deliveredAt: Date | null;
  orderitems: OrderItem[];
  user: { name: string | null; email: string };
};
export type PaymentResult = z.infer<typeof paymentResultSchema>;
