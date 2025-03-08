"use server"

import { db } from "@/db/drizzle";
import { products, users, videos } from "@/db/schema";
import { NewProduct, Product, User, userCreateProps, Videos } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { uid } from "uid";
import { eq } from "drizzle-orm"

export const getUserVideos = async() => {
    try{
        const { userId } = await auth();
        if(!userId) {
            throw new Error("Unauthorized");
        }
        const user = await db.select().from(users).where(eq(users.userId, userId)).limit(1);

        if(!user[0]) {
            throw new Error("User not found");
        }

        const allVideos: Videos[] = await db.select().from(videos).where(eq(videos.userId, user[0].id));
        return allVideos;
    }catch(error) {
        console.log("error ", error);
        throw error;
    }
}