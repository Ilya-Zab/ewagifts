import { z } from "zod";

export const SubcategorySchema = z.object({
    id: z.number(),
    categoryName: z.string(),
    slug: z.string(),
});

export const CategoriesMenuSchema = z.object({
    id: z.number(),
    categoryName: z.string(),
    slug: z.string(),
    subcategories: z.array(SubcategorySchema),
});

export interface IconButtonProps
{
    src: string;
    alt: string;
    width: number;
    height: number;
    [key: string]: string | number;
}

export type RenderIconButtonProps = IconButtonProps;

export type Category = z.infer<typeof CategoriesMenuSchema>;