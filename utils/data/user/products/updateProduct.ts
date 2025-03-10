"use server"

import { db } from "@/db/drizzle";
import { products, users } from "@/db/schema";
import { Product } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";

interface UpdateProductProps {
  productId: string;
  name: string;
  description: string;
}

export const updateProduct = async ({ productId, name, description }: UpdateProductProps): Promise<Product> => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.select().from(users).where(eq(users.userId, userId)).limit(1);

    if (!user[0]) {
      throw new Error("User not found");
    }

    // Verify the product belongs to the user before updating
    const existingProduct = await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.id, productId),
          eq(products.userId, user[0].id)
        )
      )
      .limit(1);

    if (!existingProduct[0]) {
      throw new Error("Product not found or you don't have permission to update it");
    }

    // Update the product
    const updatedProduct = await db
      .update(products)
      .set({
        name,
        description,
      })
      .where(eq(products.id, productId))
      .returning();

    return updatedProduct[0];
  } catch (error: any) {
    console.error("Error updating product:", error);
    throw new Error(error.message);
  }
};
