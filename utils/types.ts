import { hooks, products, users, videos } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { z } from "zod";

export type userCreateProps = z.infer<typeof userCreateSchema>;

const userCreateSchema = z.object({
  email: z.string().email({ message: "Invalid email" }).describe("user email"),
  first_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "First name must only contain letters" })
    .min(3, { message: "First name is required" })
    .describe("user first name"),
  last_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "Last name must only contain letters" })
    .min(3, { message: "Last name is required" })
    .describe("user last name"),
  profile_image_url: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .describe("user profile image URL"),
  user_id: z.string().describe("user ID"),
});

export type userUpdateProps = z.infer<typeof userUpdateSchema>;

const userUpdateSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .nonempty({ message: "Email is required" })
    .describe("user email"),
  first_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "First name must only contain letters" })
    .describe("user first name"),
  last_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "Last name must only contain letters" })
    .describe("user last name"),
  profile_image_url: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .describe("user profile image URL"),
  user_id: z.string().describe("user ID"),
});


export type User = InferSelectModel<typeof users>

export type Product = InferSelectModel<typeof products>
export type NewProduct = InferInsertModel<typeof products>


export type Hook = InferSelectModel<typeof hooks>
export type NewHook = InferSelectModel<typeof hooks>

export type Videos = InferSelectModel<typeof videos>
export type NewVideos = InferSelectModel<typeof videos>