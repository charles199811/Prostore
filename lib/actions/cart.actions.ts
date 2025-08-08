"use server";

import { cookies } from "next/headers";
import { CartItem } from "@/types";
import { converToPlainObject, formatError, round2 } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema } from "../validators";
import { ifError } from "assert";

//Calculate cart price
const calcPrice = (items: CartItem[]) => {
  const itemPrice = round2(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    shippingPrice = round2(itemPrice > 100 ? 0 : 100),
    taxPrice = round2(0.15 * itemPrice),
    totalPrice = round2(itemPrice + taxPrice + shippingPrice);

    return {
      itemPrice: itemPrice.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      taxPrice: taxPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    }
};

export async function addItemToCart(data: CartItem) {
  try {
    //Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");

    //Get session and user ID
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    //Get cart
    const cart = await getMyCart();

    //Parse and validate item
    const item = cartItemSchema.parse(data);

    //Find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    //Testing
    console.log({
      "session Cart Id": sessionCartId,
      "User Id": userId,
      "Item Rquested": item,
      "Product Found": product,
    });
    return {
      success: true,
      message: "Item added to cart",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getMyCart() {
  //Check for cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Cart session not found");

  //Get session and user ID
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  //Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  //Convert decimals and return
  return converToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemPrice: cart.itemPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}
