import { z } from "zod";

//schema.prismaからのデフォルト
export const NewsContentSchema = z.object({
    id: z.string(),
    title: z.string(),
    body: z.string().nullable(),//nullableはnullの値自体を許可、optionalはフィールド無しでparseしても許可されるやつ
    imageUrl: z.string().url().nullable(),
    favorite: z.number(),
    bookmark: z.number(),

    quotedId: z.string().nullable(),
    userId: z.string().nonempty(),
})

//データを受け取る時はtitle, body, imageUrlが必要
export const CreateNewsContentInputSchema = NewsContentSchema.pick({
    title: true,
    body: true,
    imageUrl: true,
}).extend({
    body: z.string().nullable().optional(),
    imageUrl: z.string().nullable().optional()
})

//createする時はtitle, body, imageUrl, userIdが必要
export const CreateNewsContentSchema = NewsContentSchema.pick({
    title: true,
    body: true,
    imageUrl: true,
    userId: true
})

export const FavoriteAndBookmarkSchema = z.object({
    id: z.string(),
    userId: z.string(),
    newsContentId: z.string()
})

export const PlusAndMinusFavoriteAndBookmarkSchema = FavoriteAndBookmarkSchema.pick({
    userId: true,
    newsContentId: true
})

export const CommentSchema = z.object({
    id: z.string(),
    body: z.string(),
    commentIndex: z.number(),
    userId: z.string(),
    newsContentId: z.string()
})

export const CreateCommentInputSchema = CommentSchema.pick({
    body: true,
})

export const CreateCommentSchema = CommentSchema.omit({
    id: true,
})

export type NewsContent = z.infer<typeof NewsContentSchema>

export type CreateNewsContent = z.infer<typeof CreateNewsContentSchema>

export type PlusAndMinusFavoriteAndBookmark = z.infer<typeof PlusAndMinusFavoriteAndBookmarkSchema>

export type CreateComment = z.infer<typeof CreateCommentSchema>