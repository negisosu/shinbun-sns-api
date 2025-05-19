import express from "express"
import { CreateNewsContentSchema, NewsContent } from "../types/newsContent.schema"
import { newsContentService } from "../services/newsContent.service"

export const getNewsContents = async (req: express.Request, res: express.Response) => {
    //データ取得
    try{
        const newsContents = await newsContentService.getNewsContents()
        res.status(200).json(newsContents)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getNewsContent = async (req: express.Request, res: express.Response) => {
    //パラメーターからid取得
    const id = req.params.id

    //データ取得
    try{
        const newsContent = await newsContentService.getNewsContent(id)
        res.status(200).json(newsContent)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const createNewsContent = async (req: express.Request, res: express.Response) => {
    //値の検証
    const result = CreateNewsContentSchema.safeParse(req.body)

    //検証が失敗した場合
    if(!result.success){
        res.status(400).json({ errors: result.error.flatten() })
        return
    }

    //データ作成
    try{
        const newsContent = await newsContentService.createNewsContent(result.data)
        res.status(201).json(newsContent)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}