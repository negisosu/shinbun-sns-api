import { z } from "zod";

export const NewsContentSchema = z.object({
    id: z.string(),
    title: z.string(),
    body: z.string().nullable(),//nullableはnullの値自体を許可、optionalはフィールド無しでparseしても許可されるやつ
    imageUrl: z.string().url().nullable(),
    favorite: z.number(),
    quotedId: z.string().nullable(),
    userId: z.string().nonempty(),
})

export const CreateNewsContentSchema = NewsContentSchema.omit({
    id: true,
    favorite: true,
    quotedId: true,
}).extend({
    body: z.string().nullable().optional(),
    imageUrl: z.string().nullable().optional()
})

export const UpdateNewsContentFavoriteSchema = NewsContentSchema.pick({
    favorite: true,
})

export const FavoriteSchema = z.object({
    id: z.string(),
    userId: z.string(),
    newsContentId: z.string()
})

export const UpdateFavoriteSchema = FavoriteSchema.pick({
    userId: true
})

export const UpdateFavoriteServiceSchema = FavoriteSchema.omit({
    id: true
})

export type NewsContent = z.infer<typeof NewsContentSchema>

export type CreateNewsContentInput = z.infer<typeof CreateNewsContentSchema>

export type UpdateNewsContentFavoriteInput = z.infer<typeof UpdateNewsContentFavoriteSchema>

export type Favorite = z.infer<typeof FavoriteSchema>

export type UpdateFavoriteInputService = z.infer<typeof UpdateFavoriteServiceSchema>

export type UpdateFavoriteInput = z.infer<typeof UpdateFavoriteSchema>



