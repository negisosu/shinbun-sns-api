import express from "express"
import {
    bookmarkMinus,
    bookmarkPlus,
    createComment,
    createNewsContent,
    deleteComment,
    deleteNewsContent,
    favoriteMinus,
    favoritePlus,
    getComment,
    getComments,
    getNewsContent,
    getNewsContentComments,
    getNewsContents
} from "../controllers/newsContent.controller"

const router = express.Router()

//comments
router.get("/comments", getComments)//Comment全件取得
router.get("/comments/:commentId", getComment)//Comment一件取得
router.delete("/comments/:commentId", deleteComment)//Comment一件削除

router.get("/:id/comments", getNewsContentComments)//NewsContent内のComment全件取得
router.post("/:id/comments", createComment)//NewsContent指定のComment一件作成（ユーザーは自動で認証ユーザー）

//read
router.get("/", getNewsContents)//NewsContent全件取得
router.get("/:id", getNewsContent)//NewsContent一件取得

//create
router.post("/", createNewsContent)//NewsContent一件作成

//delete
router.delete("/:id", deleteNewsContent)//NewsContent一件削除

//favorite
router.post("/:id/favorite-plus", favoritePlus)//いいね登録
router.post("/:id/favorite-minus", favoriteMinus)//いいね登録解除

//bookmark
router.post("/:id/bookmark-plus", bookmarkPlus)//ブックマーク登録
router.post("/:id/bookmark-minus", bookmarkMinus)//ブックマーク登録解除

export default router