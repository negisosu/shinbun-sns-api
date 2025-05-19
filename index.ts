import express from "express"
import userRoutes from "./routers/user.routes"
import newsContentRoutes from "./routers/newsContent.routes"

const app: express.Express = express()
const port = 3002

//リクエストやレスポンスでjsonを使用
app.use(express.json())
app.use("/users", userRoutes)
app.use("/news-contents", newsContentRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})