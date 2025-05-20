import { getNewsContents, postFavoritePlus } from "../controllers/newsContent.controller"
import { prisma } from "../lib/prisma"
import { CreateNewsContentInput, UpdateFavoriteInput, UpdateFavoriteInputService, UpdateNewsContentFavoriteInput } from "../types/newsContent.schema"

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
    createNewsContent: async (data: CreateNewsContentInput) => {
        try{
            const newsContent = await prisma.newsContent.create({
                data: {
                    title: data.title,
                    body: data.body ?? undefined,//??は左の値がnullの時のみ反応するやつ
                    imageUrl: data.imageUrl ?? undefined,
                    userId: data.userId
                }
            })
            return newsContent
        }catch(error){
            console.error(error)
            throw error
        }
    },
    postIsFavorite: async (data: UpdateFavoriteInputService): Promise<boolean> => {
        try{
            const alreadyFavorite = await prisma.favorite.findUnique({
                where: {
                    userId_newsContentId: {
                        userId: data.userId,
                        newsContentId: data.newsContentId
                    }
                }
            })

            if(alreadyFavorite){
                return true
            }else{
                return false
            }
        }catch(error){
            console.error(error)
            throw error
        }
    },
    postFavoritePlus: async (data: UpdateFavoriteInputService) => {
        try{
            const isFavorite = await newsContentService.postIsFavorite(data)

            if(isFavorite){
                throw new Error("Favorite Failed")
            }

            await prisma.$transaction([
                //newsContentの値を更新
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
                //Favoriteの作成
                prisma.favorite.create({
                    data: {
                        userId: data.userId,
                        newsContentId: data.newsContentId
                    }
                })
            ])
        }catch(error){
            console.error(error)
            throw error
        }
    },
    postFavoriteMinus: async (data: UpdateFavoriteInputService) => {
        try{
            const isFavorite = await newsContentService.postIsFavorite(data)

            if(!isFavorite){
                throw new Error("Favorite Failed")
            }

            await prisma.$transaction([
                //newsContentの値を更新
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
                //Favoriteの作成
                prisma.favorite.delete({
                    where: {
                        userId_newsContentId: {
                            userId: data.userId,
                            newsContentId: data.newsContentId
                        }
                    }
                })
            ])
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
    }
}