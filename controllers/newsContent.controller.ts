import express from "express"
import {
    CreateComment,
    CreateCommentInputSchema,
    CreateNewsContentInputSchema,
} from "../types/newsContent.schema"
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

    //userがMyJwtPayload型であることを確認
    if(typeof req.user == "string"){
        res.status(401).json({ error: 'Invalid token payload structure' })
        return
    }

    //authenticateを通ってreq.userを入れてるかの確認
    if(!req.user?.sub){
        res.status(401).json({ error: 'Token not provided or invalid' })
        return
    }

    //認証したユーザーのidを取得
    const userId = req.user.sub

    //値の検証
    const result = CreateNewsContentInputSchema.safeParse(req.body)

    //検証が失敗した場合
    if(!result.success){
        res.status(400).json({ errors: result.error.flatten() })
        return
    }

    //??はnullとundefinedのとき両方反応するからundefinedを許容しないために明示的にnull
    const data = {
        title: result.data.title,
        body: result.data.body ?? null,
        imageUrl: result.data.imageUrl ?? null,
        userId: userId
    }

    try{
        const newNewsContent = await newsContentService.createNewsContent(data)
        res.status(201).json(newNewsContent)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }

}

export const deleteNewsContent = async (req: express.Request, res: express.Response) => {
    const id = req.params.id

    try{
        const newsContent = await newsContentService.deleteNewsContent(id)
        res.status(200).json(newsContent)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const favoritePlus = async (req: express.Request, res: express.Response) => {

    //userがMyJwtPayload型であることを確認
    if(typeof req.user == "string"){
        res.status(401).json({ error: 'Invalid token payload structure' })
        return
    }

    //authenticateを通ってreq.userを入れてるかの確認
    if(!req.user?.sub){
        res.status(401).json({ error: 'Token not provided or invalid' })
        return
    }

    //認証したユーザーのidを取得
    const userId = req.user.sub

    const newsContentId = req.params.id

    const data = {
        userId,
        newsContentId
    }

    try{
        const isFavorite = await newsContentService.isFavorite(data)

        if(isFavorite){
            res.status(400).json({ error: 'Favorite already exists' })
            return
        }

        await newsContentService.favoritePlus(data)
        res.status(200).json({ message: 'Favorite registration successful' })
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const favoriteMinus = async (req: express.Request, res: express.Response) => {
    //userがMyJwtPayload型であることを確認
    if(typeof req.user == "string"){
        res.status(401).json({ error: 'Invalid token payload structure' })
        return
    }

    //authenticateを通ってreq.userを入れてるかの確認
    if(!req.user?.sub){
        res.status(401).json({ error: 'Token not provided or invalid' })
        return
    }

    //認証したユーザーのidを取得
    const userId = req.user.sub

    const newsContentId = req.params.id

    const data = {
        userId,
        newsContentId
    }

    try{
        const isFavorite = await newsContentService.isFavorite(data)

        if(!isFavorite){
            res.status(400).json({ error: 'Favorite not exists' })
            return
        }

        await newsContentService.favoriteMinus(data)
        res.status(200).json({ message: 'Favorite deregistration successful' })
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const bookmarkPlus = async (req: express.Request, res: express.Response) => {

    //userがMyJwtPayload型であることを確認
    if(typeof req.user == "string"){
        res.status(401).json({ error: 'Invalid token payload structure' })
        return
    }

    //authenticateを通ってreq.userを入れてるかの確認
    if(!req.user?.sub){
        res.status(401).json({ error: 'Token not provided or invalid' })
        return
    }

    //認証したユーザーのidを取得
    const userId = req.user.sub

    const newsContentId = req.params.id

    const data = {
        userId,
        newsContentId
    }

    try{
        const isBookmark = await newsContentService.isBookmark(data)

        if(isBookmark){
            res.status(400).json({ error: 'Bookmark already exists' })
            return
        }

        await newsContentService.bookmarkPlus(data)
        res.status(200).json({ message: 'Bookmark registration successful' })
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const bookmarkMinus = async (req: express.Request, res: express.Response) => {
    //userがMyJwtPayload型であることを確認
    if(typeof req.user == "string"){
        res.status(401).json({ error: 'Invalid token payload structure' })
        return
    }

    //authenticateを通ってreq.userを入れてるかの確認
    if(!req.user?.sub){
        res.status(401).json({ error: 'Token not provided or invalid' })
        return
    }

    //認証したユーザーのidを取得
    const userId = req.user.sub

    const newsContentId = req.params.id

    const data = {
        userId,
        newsContentId
    }

    try{
        const isBookmark = await newsContentService.isBookmark(data)

        if(!isBookmark){
            res.status(400).json({ error: 'Bookmark not exists' })
            return
        }

        await newsContentService.bookmarkMinus(data)
        res.status(200).json({ message: 'Bookmark deregistration successful' })
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getComments = async (req: express.Request, res: express.Response) => {
    try{
        const comments = await newsContentService.getComments()
        res.status(200).json(comments)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getNewsContentComments = async (req: express.Request, res: express.Response) => {
    const id = req.params.id

    try{
        const comments = await newsContentService.getNewsContentComments(id)
        res.status(200).json(comments)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getComment = async (req: express.Request, res: express.Response) => {
    const id = req.params.commentId

    try{
        const comment = await newsContentService.getComment(id)
        res.status(200).json(comment)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const createComment = async (req: express.Request, res: express.Response) => {
    //userがMyJwtPayload型であることを確認
    if(typeof req.user == "string"){
        res.status(401).json({ error: 'Invalid token payload structure' })
        return
    }

    //authenticateを通ってreq.userを入れてるかの確認
    if(!req.user?.sub){
        res.status(401).json({ error: 'Token not provided or invalid' })
        return
    }

    //認証したユーザーのidを取得
    const userId = req.user.sub

    const newsContentId = req.params.id

    const result = CreateCommentInputSchema.safeParse(req.body)

    if(!result.success){
        res.status(400).json({ errors: result.error.flatten() })
        return
    }

    try{
        const lastComment = await newsContentService.getLastComment(newsContentId)

        console.log(lastComment)

        const nextIndex = (lastComment?.commentIndex || 0) + 1

        const data: CreateComment = {
            body: result.data.body,
            commentIndex: nextIndex,
            userId: userId,
            newsContentId: newsContentId
        }

        const newComment = await newsContentService.createComment(data)
        res.status(201).json(newComment)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const deleteComment = async (req: express.Request, res: express.Response) => {
    const id = req.params.commentId

    try{
        const comment = await newsContentService.deleteComment(id)
        res.status(200).json(comment)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}