"use server";

import z from "zod";
import { insertReviewSchema } from "../validators";
import { formatError } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { tr } from "zod/v4/locales";
import { revalidatePath } from "next/cache";

//Create & Update reviews
export async function createUpdateReview(
  data: z.infer<typeof insertReviewSchema>
) {
  try {
    const session = await auth();
    if (!session) throw new Error("Useris not authenticated");

    //Validate and Store the review
    const review = insertReviewSchema.parse({
      ...data,
      userId: session.user.id,
    });

    //Get the product that is being reviewd
    const product = await prisma.product.findFirst({
      where: { id: review.productId },
    });

    if (!product) throw new Error("Product not found");

    //Check if user allready reviewd
    const reviewExists = await prisma.reviews.findFirst({
      where: {
        productId: review.productId,
        userId: review.userId,
      },
    });

    await prisma.$transaction(async (tx) => {
      if (reviewExists) {
        //Update the review
        await tx.reviews.update({
          where: { id: reviewExists.id },
          data: {
            title: review.title,
            description: review.description,
            rating: review.rating,
          },
        });
      } else {
        //Create the review
        await tx.reviews.create({ data: review });
      }
      //if else non of the above get the averate of the review
      const averageRating = await tx.reviews.aggregate({
        _avg: { rating: true },
        where: { productId: review.productId },
      });

      //Get the number of reviews
      const numReviews = await tx.reviews.count({
        where: { productId: review.productId },
      });

      //Update the ratings and number of reviews in the products table
      await tx.product.update({
        where: { id: review.productId },
        data: {
          rating: averageRating._avg.rating || 0,
          numReviews,
        },
      });
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: "Review updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
