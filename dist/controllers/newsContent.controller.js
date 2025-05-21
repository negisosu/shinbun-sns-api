"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNewsContent = exports.postFavoriteMinus = exports.postFavoritePlus = exports.postIsFavorite = exports.createNewsContent = exports.getNewsContent = exports.getNewsContents = void 0;
const newsContent_schema_1 = require("../types/newsContent.schema");
const newsContent_service_1 = require("../services/newsContent.service");
const getNewsContents = async (req, res) => {
    //データ取得
    try {
        const newsContents = await newsContent_service_1.newsContentService.getNewsContents();
        res.status(200).json(newsContents);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getNewsContents = getNewsContents;
const getNewsContent = async (req, res) => {
    //パラメーターからid取得
    const id = req.params.id;
    //データ取得
    try {
        const newsContent = await newsContent_service_1.newsContentService.getNewsContent(id);
        res.status(200).json(newsContent);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getNewsContent = getNewsContent;
const createNewsContent = async (req, res) => {
    //値の検証
    const result = newsContent_schema_1.CreateNewsContentSchema.safeParse(req.body);
    //検証が失敗した場合
    if (!result.success) {
        res.status(400).json({ errors: result.error.flatten() });
        return;
    }
    //データ作成
    try {
        const newsContent = await newsContent_service_1.newsContentService.createNewsContent(result.data);
        res.status(201).json(newsContent);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.createNewsContent = createNewsContent;
const postIsFavorite = async (req, res) => {
    //newsContentのid取得
    const newsContentId = req.params.id;
    const result = newsContent_schema_1.UpdateFavoriteSchema.safeParse(req.body);
    //検証に失敗した場合
    if (!result.success) {
        res.status(400).json({ errors: result.error.flatten() });
        return;
    }
    const data = {
        userId: result.data.userId,
        newsContentId: newsContentId
    };
    //データ取得
    try {
        const isFavorite = await newsContent_service_1.newsContentService.postIsFavorite(data);
        res.status(200).json({ isFavorite: isFavorite });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.postIsFavorite = postIsFavorite;
const postFavoritePlus = async (req, res) => {
    //newsContentのid取得
    const newsContentId = req.params.id;
    const result = newsContent_schema_1.UpdateFavoriteSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ errors: result.error.flatten() });
        return;
    }
    const data = {
        userId: result.data.userId,
        newsContentId: newsContentId
    };
    //データ更新
    try {
        await newsContent_service_1.newsContentService.postFavoritePlus(data);
        res.status(200).json({ message: "Favorite registration successful" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.postFavoritePlus = postFavoritePlus;
const postFavoriteMinus = async (req, res) => {
    //newsContentのid取得
    const newsContentId = req.params.id;
    const result = newsContent_schema_1.UpdateFavoriteSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ errors: result.error.flatten() });
        return;
    }
    const data = {
        userId: result.data.userId,
        newsContentId: newsContentId
    };
    try {
        await newsContent_service_1.newsContentService.postFavoriteMinus(data);
        res.status(200).json({ message: "Favorite deregistration successful" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.postFavoriteMinus = postFavoriteMinus;
const deleteNewsContent = async (req, res) => {
    //id取得
    const id = req.params.id;
    //データ削除
    try {
        const newsContent = await newsContent_service_1.newsContentService.deleteNewsContent(id);
        res.status(200).json(newsContent);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.deleteNewsContent = deleteNewsContent;
