import express from "express"
import { createNewsContent, getNewsContent, getNewsContents } from "../controllers/newsContent.controller"

const router = express.Router()

router.get("/", getNewsContents)
router.get("/:id", getNewsContent)
router.post("/", createNewsContent)


export default router