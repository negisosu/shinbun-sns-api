import express from "express"
import { createUser, deleteUser, getCurrentUser, getUser, getUsers, updateUser } from "../controllers/user.controller"

const router = express.Router()

router.get("/", getUsers)
router.get("/current-user", getCurrentUser)
router.get("/:id", getUser)
router.post("/", createUser)
router.patch("/:id", updateUser)
router.delete("/:id", deleteUser)


export default router