import express from "express";
import { userService } from "../services/user.service";
import { CreateUserSchema, UpdateUserSchema, User } from "../types/user.schema";

export const getUsers = async (req: express.Request, res: express.Response): Promise<void> => {
    //データ取得
    try{
        const users: User[] = await userService.getUsers()
        res.status(200).json(users)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getUser = async (req: express.Request, res: express.Response): Promise<void> => {
    //パラメーターからidの取得
    const id = req.params.id

    //データ取得
    try{
        const user = await userService.getUser(id)

        //userのnullチェック
        if(!user){
            res.status(404).json({ error: 'User Not Found' })
        }

        res.status(200).json(user)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getCurrentUser = async (req: express.Request, res: express.Response): Promise<void> => {

    if(typeof req.user == "string"){
        res.status(401).json({ error: 'Invalid token payload structure' })
        return
    }

    //authenticateを通ってreq.userを入れてるかの確認
    if(!req.user?.sub){
        res.status(401).json({ error: 'Token not provided or invalid' })
        return
    }

    const id = req.user.sub

    try{
        const user = await userService.getUser(id)

        //userのnullチェック
        if(!user){
            res.status(404).json({ error: 'User Not Found' })
        }

        res.status(200).json(user)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const createUser = async (req: express.Request, res: express.Response): Promise<void> => {
    if(typeof req.user == "string"){
        res.status(401).json({ error: 'Invalid token payload structure' })
        return
    }

    const data = {
        id: req.user?.sub,
        name: "ユーザー",
        email: req.user?.email
    }
    
    const result = CreateUserSchema.safeParse(data)

    if(!result.success) {
        res.status(400).json({ errors: result.error.flatten() })
        return
    }

    try{
        const user = await userService.createUser(result.data)
        res.status(201).json(user)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const updateUser = async (req: express.Request, res: express.Response): Promise<void> => {
    //パラメーターからidの取得
    const id = req.params.id

    //zodによる値の検証
    const result = UpdateUserSchema.safeParse(req.body)

    //検証に失敗した場合
    if(!result.success){
        res.status(400).json({ errors: result.error.flatten() })
        return
    }

    //データ更新
    try{
        const user = await userService.updateUser(result.data, id)

        res.status(200).json(user)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const deleteUser = async (req: express.Request, res: express.Response): Promise<void> => {
    //パラメーターからidの取得
    const id = req.params.id

    //データ削除
    try{
        const user = await userService.deleteUser(id)

        //userのnullチェック
        if(!user){
            res.status(404).json({ error: 'User Not Found'})
        }

        res.status(200).json(user)
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}