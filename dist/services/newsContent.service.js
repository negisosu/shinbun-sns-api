"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsContentService = void 0;
const prisma_1 = require("../lib/prisma");
exports.newsContentService = {
    getNewsContents: async () => {
        try {
            const newsContents = await prisma_1.prisma.newsContent.findMany();
            return newsContents;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    getNewsContent: async (id) => {
        try {
            const newsContent = await prisma_1.prisma.newsContent.findUnique({
                where: {
                    id: id
                }
            });
            if (!newsContent) {
                throw new Error("NewsContent Not Found");
            }
            return newsContent;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    createNewsContent: async (data) => {
        try {
            const newsContent = await prisma_1.prisma.newsContent.create({
                data: {
                    title: data.title,
                    body: data.body ?? undefined,
                    imageUrl: data.imageUrl ?? undefined,
                    userId: data.userId
                }
            });
            return newsContent;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    postIsFavorite: async (data) => {
        try {
            const alreadyFavorite = await prisma_1.prisma.favorite.findUnique({
                where: {
                    userId_newsContentId: {
                        userId: data.userId,
                        newsContentId: data.newsContentId
                    }
                }
            });
            if (alreadyFavorite) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    postFavoritePlus: async (data) => {
        try {
            const isFavorite = await exports.newsContentService.postIsFavorite(data);
            if (isFavorite) {
                throw new Error("Favorite Failed");
            }
            await prisma_1.prisma.$transaction([
                //newsContentの値を更新
                prisma_1.prisma.newsContent.update({
                    where: {
                        id: data.newsContentId
                    },
                    data: {
                        favorite: {
                            increment: 1
                        }
                    }
                }),
                //Favoriteの作成
                prisma_1.prisma.favorite.create({
                    data: {
                        userId: data.userId,
                        newsContentId: data.newsContentId
                    }
                })
            ]);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    postFavoriteMinus: async (data) => {
        try {
            const isFavorite = await exports.newsContentService.postIsFavorite(data);
            if (!isFavorite) {
                throw new Error("Favorite Failed");
            }
            await prisma_1.prisma.$transaction([
                //newsContentの値を更新
                prisma_1.prisma.newsContent.update({
                    where: {
                        id: data.newsContentId
                    },
                    data: {
                        favorite: {
                            decrement: 1
                        }
                    }
                }),
                //Favoriteの作成
                prisma_1.prisma.favorite.delete({
                    where: {
                        userId_newsContentId: {
                            userId: data.userId,
                            newsContentId: data.newsContentId
                        }
                    }
                })
            ]);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    deleteNewsContent: async (id) => {
        try {
            const newsContent = await prisma_1.prisma.newsContent.delete({
                where: {
                    id: id
                }
            });
            return newsContent;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
};
