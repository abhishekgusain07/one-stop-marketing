"use server";
import { db } from "@/db/drizzle";
import { products, users } from "@/db/schema";
import { NewProduct, Product, User, userCreateProps } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { uid } from "uid";
import { eq } from "drizzle-orm"


import { ProductFormValues } from "@/utils/zodTypes";

export const createProduct = async(data: ProductFormValues) => {
    try {
        const { userId } = await auth();
        if(!userId) {
            throw new Error("Unauthorized");
        }
        const user = await db.select().from(users).where(eq(users.userId, userId)).limit(1);

        if(!user[0]) {
            throw new Error("User not found");
        }

        const newProduct: NewProduct[] = await db.insert(products).values({
            id: uid(32),
            name: data.name,
            description: data.description,
            userId: user[0].id
        }).returning();

        return newProduct[0]
    } catch (error) {
        console.log(error)
        throw error;
    }
}