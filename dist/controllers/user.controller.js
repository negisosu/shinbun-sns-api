"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getCurrentUser = exports.getUser = exports.getUsers = void 0;
const user_service_1 = require("../services/user.service");
const user_schema_1 = require("../types/user.schema");
const getUsers = async (req, res) => {
    //データ取得
    try {
        const users = await user_service_1.userService.getUsers();
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    //パラメーターからidの取得
    const id = req.params.id;
    //データ取得
    try {
        const user = await user_service_1.userService.getUser(id);
        //userのnullチェック
        if (!user) {
            res.status(404).json({ error: 'User Not Found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getUser = getUser;
const getCurrentUser = async (req, res) => {
    if (typeof req.user == "string") {
        res.status(401).json({ error: 'Invalid token payload structure' });
        return;
    }
    //authenticateを通ってreq.userを入れてるかの確認
    if (!req.user?.sub) {
        res.status(401).json({ error: 'Token not provided or invalid' });
        return;
    }
    const id = req.user.sub;
    try {
        const user = await user_service_1.userService.getUser(id);
        //userのnullチェック
        if (!user) {
            res.status(404).json({ error: 'User Not Found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getCurrentUser = getCurrentUser;
const createUser = async (req, res) => {
    if (typeof req.user == "string") {
        res.status(401).json({ error: 'Invalid token payload structure' });
        return;
    }
    const data = {
        id: req.user?.sub,
        name: "ユーザー",
        email: req.user?.email
    };
    const result = user_schema_1.CreateUserSchema.safeParse(data);
    if (!result.success) {
        res.status(400).json({ errors: result.error.flatten() });
        return;
    }
    try {
        const user = await user_service_1.userService.createUser(result.data);
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    //パラメーターからidの取得
    const id = req.params.id;
    //zodによる値の検証
    const result = user_schema_1.UpdateUserSchema.safeParse(req.body);
    //検証に失敗した場合
    if (!result.success) {
        res.status(400).json({ errors: result.error.flatten() });
        return;
    }
    //データ更新
    try {
        const user = await user_service_1.userService.updateUser(result.data, id);
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    //パラメーターからidの取得
    const id = req.params.id;
    //データ削除
    try {
        const user = await user_service_1.userService.deleteUser(id);
        //userのnullチェック
        if (!user) {
            res.status(404).json({ error: 'User Not Found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.deleteUser = deleteUser;
