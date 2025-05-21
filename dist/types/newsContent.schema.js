"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFavoriteServiceSchema = exports.UpdateFavoriteSchema = exports.FavoriteSchema = exports.UpdateNewsContentFavoriteSchema = exports.CreateNewsContentSchema = exports.NewsContentSchema = void 0;
const zod_1 = require("zod");
exports.NewsContentSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    body: zod_1.z.string().nullable(),
    imageUrl: zod_1.z.string().url().nullable(),
    favorite: zod_1.z.number(),
    quotedId: zod_1.z.string().nullable(),
    userId: zod_1.z.string().nonempty(),
});
exports.CreateNewsContentSchema = exports.NewsContentSchema.omit({
    id: true,
    favorite: true,
    quotedId: true,
}).extend({
    body: zod_1.z.string().nullable().optional(),
    imageUrl: zod_1.z.string().nullable().optional()
});
exports.UpdateNewsContentFavoriteSchema = exports.NewsContentSchema.pick({
    favorite: true,
});
exports.FavoriteSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userId: zod_1.z.string(),
    newsContentId: zod_1.z.string()
});
exports.UpdateFavoriteSchema = exports.FavoriteSchema.pick({
    userId: true
});
exports.UpdateFavoriteServiceSchema = exports.FavoriteSchema.omit({
    id: true
});
