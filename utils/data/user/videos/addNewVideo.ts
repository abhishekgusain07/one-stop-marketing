"use server"


import { db } from "@/db/drizzle";
import { products, users, videos } from "@/db/schema";
import { NewProduct, Product, User, userCreateProps, Videos } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { uid } from "uid";
import { eq } from "drizzle-orm"

interface addNewVideoProps {
    url: string;
    productId: string | null;
    hookText: string | null;
}
export const addNewVideo = async({url, productId, hookText}:addNewVideoProps):Promise<Videos|null> => {
    try{
        const { userId } = await auth();
        if(!userId) {
            throw new Error("Unauthorized");
        }
        const user = await db.select().from(users).where(eq(users.userId, userId)).limit(1);

        if(!user[0]) {
            throw new Error("User not found");
        }

        const newVideo = await db.insert(videos).values({
            id: uid(32),
            hookText,
            url,
            productId,
            createdTime: new Date(),
            userId: user[0].id
        }).returning();

        return newVideo[0];
    }catch(error) {
        console.log(error);
        throw error;
    }
}

