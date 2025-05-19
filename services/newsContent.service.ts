import { getNewsContents } from "../controllers/newsContent.controller"
import { prisma } from "../lib/prisma"
import { CreateNewsContentInput, NewsContent } from "../types/newsContent.schema"

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
    }
}