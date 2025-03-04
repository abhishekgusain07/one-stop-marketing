import {z} from "zod"


export const productFormSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" }),
    description: z
      .string()
      .min(1, { message: "Description of what it does is required" })
  });
  
export type ProductFormValues = z.infer<typeof productFormSchema>;