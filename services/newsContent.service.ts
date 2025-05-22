import { prisma } from "../lib/prisma"
import {
    CreateComment,
    CreateNewsContent,
    PlusAndMinusFavoriteAndBookmark
} from "../types/newsContent.schema"

export const newsContentService = {
    getNewsContents: async () => {
        try{
            const newsContents = await prisma.newsContent.findMany()
            return newsContents
        }catch(error){
            console.error(error)
            throw error
        }
    },
    getNewsContent: async (id: string) => {
        try{
            const newsContent = await prisma.newsContent.findUnique({
                where: {
                    id: id
                }
            })

            if(!newsContent){
                throw new Error("NewsContent Not Found")
            }

            return newsContent
        }catch(error){
            console.error(error)
            throw error
        }
    },
    createNewsContent: async (data: CreateNewsContent) => {
        try{
            const newsContent = await prisma.newsContent.create({
                data: data
            })
            return newsContent
        }catch(error){
            console.error(error)
            throw error
        }
    },
    deleteNewsContent: async (id: string) => {
        try{
            const newsContent = await prisma.newsContent.delete({
                where: {
                    id: id
                }
            })
            return newsContent
        }catch(error){
            console.error(error)
            throw error
        }
    },
    isFavorite: async (data: PlusAndMinusFavoriteAndBookmark): Promise<boolean> => {
        try{
            const favorite = await prisma.favorite.findUnique({
                where: {
                    userId_newsContentId: data
                }
            })

            if(favorite){
                return true
            }else{
                return false
            }
        }catch(error){
            console.error(error)
            throw error
        }
    },
    favoritePlus: async (data: PlusAndMinusFavoriteAndBookmark) => {
        try{
            await prisma.$transaction([
                prisma.newsContent.update({
                    where: {
                        id: data.newsContentId
                    },
                    data: {
                        favorite: {
                            increment: 1
                        }
                    }
                }),
                prisma.favorite.create({
                    data: data
                })
            ])
        }catch(error){
            console.error(error)
            throw error
        }
    },
    favoriteMinus: async (data: PlusAndMinusFavoriteAndBookmark) => {
        try{
            await prisma.$transaction([
                prisma.newsContent.update({
                    where: {
                        id: data.newsContentId
                    },
                    data: {
                        favorite: {
                            decrement: 1
                        }
                    }
                }),
                prisma.favorite.delete({
                    where: {
                        userId_newsContentId: data
                    }
                })
            ])
        }catch(error){
            console.error(error)
            throw error
        }
    },
    isBookmark: async (data: PlusAndMinusFavoriteAndBookmark): Promise<boolean> => {
        try{
            const bookmark = await prisma.bookmark.findUnique({
                where: {
                    userId_newsContentId: data
                }
            })

            if(bookmark){
                return true
            }else{
                return false
            }
        }catch(error){
            console.error(error)
            throw error
        }
    },
    bookmarkPlus: async (data: PlusAndMinusFavoriteAndBookmark) => {
        try{
            await prisma.$transaction([
                prisma.newsContent.update({
                    where: {
                        id: data.newsContentId
                    },
                    data: {
                        bookmark: {
                            increment: 1
                        }
                    }
                }),
                prisma.bookmark.create({
                    data: data
                })
            ])
        }catch(error){
            console.error(error)
            throw error
        }
    },
    bookmarkMinus: async (data: PlusAndMinusFavoriteAndBookmark) => {
        try{
            await prisma.$transaction([
                prisma.newsContent.update({
                    where: {
                        id: data.newsContentId
                    },
                    data: {
                        bookmark: {
                            decrement: 1
                        }
                    }
                }),
                prisma.bookmark.delete({
                    where: {
                        userId_newsContentId: data
                    }
                })
            ])
        }catch(error){
            console.error(error)
            throw error
        }
    },
    getComments: async () => {
        try{
            const comments = await prisma.comment.findMany()
            return comments
        }catch(error){
            console.error(error)
            throw error
        }
    },
    getNewsContentComments: async (id: string) => {
        try{
            const comments = await prisma.comment.findMany({
                where: {
                    newsContentId: id
                }
            })
            return comments
        }catch(error){
            console.error(error)
            throw error
        }
    },
    getComment: async (commentId: string) => {
        try{
            const comment = await prisma.comment.findUnique({
                where: {
                    id: commentId
                }
            })
            return comment
        }catch(error){
            console.error(error)
            throw error
        }
    },
    getLastComment: async (id: string) => {
        try{
            const lastComment = await prisma.comment.findFirst({
                where: {
                    newsContentId: id
                },
                orderBy: {
                    commentIndex: "desc"
                }
            })
            return lastComment
        }catch(error){
            console.error(error)
            throw error
        }
    },
    createComment: async (data: CreateComment) => {
        try{
            const comment = await prisma.comment.create({
                data: data
            })
            return comment
        }catch(error){
            console.error(error)
            throw error
        }
    },
    deleteComment: async (commentId: string) => {
        try{
            const comment = await prisma.comment.delete({
                where: {
                    id: commentId
                }
            })
            return comment
        }catch(error){
            console.error(error)
            throw error
        }
    },
}