import express from "express"
import { CreateNewsContentSchema, NewsContent, UpdateFavoriteSchema } from "../types/newsContent.schema"
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

export const postIsFavorite = async (req: express.Request, res: express.Response) => {
    //newsContentのid取得
    const newsContentId = req.params.id

    const result = UpdateFavoriteSchema.safeParse(req.body)

    //検証に失敗した場合
    if(!result.success){
        res.status(400).json({ errors: result.error.flatten() })
        return
    }

    const data = {
        userId: result.data.userId,
        newsContentId: newsContentId
    }

    //データ取得
    try{
        const isFavorite: boolean = await newsContentService.postIsFavorite(data)
        res.status(200).json({ isFavorite: isFavorite })
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const postFavoritePlus = async (req: express.Request, res: express.Response) => {
    //newsContentのid取得
    const newsContentId = req.params.id

    const result = UpdateFavoriteSchema.safeParse(req.body)

    if(!result.success){
        res.status(400).json({ errors: result.error.flatten() })
        return
    }

    const data = {
        userId: result.data.userId,
        newsContentId: newsContentId
    }

    //データ更新
    try{
        await newsContentService.postFavoritePlus(data)
        res.status(200).json({ message: "Favorite registration successful"})
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const postFavoriteMinus = async (req: express.Request, res: express.Response) => {
    //newsContentのid取得
    const newsContentId = req.params.id

    const result = UpdateFavoriteSchema.safeParse(req.body)

    if(!result.success){
        res.status(400).json({ errors: result.error.flatten() })
        return
    }

    const data = {
        userId: result.data.userId,
        newsContentId: newsContentId
    }

    try{
        await newsContentService.postFavoriteMinus(data)
        res.status(200).json({ message: "Favorite deregistration successful"})
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const deleteNewsContent = async (req: express.Request, res: express.Response) => {
    //id取得
    const id = req.params.id

    //データ削除
    try{
        const newsContent = await newsContentService.deleteNewsContent(id)
        res.status(200).json(newsContent)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}