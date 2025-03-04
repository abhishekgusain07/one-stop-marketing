"use server"
import { db } from "@/db/drizzle";
import { products, users } from "@/db/schema";
import { Product, User, userCreateProps } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { uid } from "uid";
import { eq } from "drizzle-orm"

interface deleteProductProps {
    productId: string
}
export const deleteProduct = async( {
    productId
}: deleteProductProps) => {
    try {
        const { userId } = await auth();
        if(!userId) {
            throw new Error("Unauthorized");
        }
        const user = await db.select().from(users).where(eq(users.userId, userId)).limit(1);

        if(!user[0]) {
            throw new Error("User not found");
        }
        
        await db
        .delete(products)
        .where(
            eq(products.id, productId)
            && eq(products.userId, user[0].id)
        );
        return true;
    } catch (error) {
        console.error("error deleting product: ", error);
        throw error;
    }
}