import express from "express"
import { createNewsContent, deleteNewsContent, getNewsContent, getNewsContents, postFavoriteMinus, postFavoritePlus, postIsFavorite } from "../controllers/newsContent.controller"

const router = express.Router()

router.get("/", getNewsContents)
router.get("/:id", getNewsContent)
router.post("/", createNewsContent)
router.post("/:id/is-favorite", postIsFavorite)
router.post("/:id/favorite-plus", postFavoritePlus)
router.post("/:id/favorite-minus", postFavoriteMinus)
router.delete("/:id", deleteNewsContent)


export default router