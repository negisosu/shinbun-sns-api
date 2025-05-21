import express from "express"
import userRoutes from "./routers/user.routes"
import newsContentRoutes from "./routers/newsContent.routes"
import { authenticate } from "./middlewares/authenticate"

const app: express.Express = express()
const port = 3002

//リクエストやレスポンスでjsonを使用
app.use(express.json())
//Flutterから正しいaccessTokenを送られてきてるかを判定するmiddleware,自分でapi構築する時は使用しない
app.use(authenticate)
// app.use("/users", userRoutes)
// app.use("/news-contents", newsContentRoutes)

app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: "Authentication successful" })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})