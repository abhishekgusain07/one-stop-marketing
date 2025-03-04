"use server"

import { db } from "@/db/drizzle";
import { products, users } from "@/db/schema";
import { Product, User, userCreateProps } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { uid } from "uid";
import { eq } from "drizzle-orm"

export const getProductsOfUser = async (): Promise<Product[] | null> => {
  try {
    const { userId } = await auth();
    if(!userId) {
        throw new Error("Unauthorized");
    }
    const user = await db.select().from(users).where(eq(users.userId, userId)).limit(1);

    if(!user[0]) {
        throw new Error("User not found");
    }

    const userProducts = await db
        .select()
        .from(users)
        .innerJoin(products, eq(products.userId, users.id))
        .where(eq(users.userId, userId));

    return userProducts.map(row => row.products);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
