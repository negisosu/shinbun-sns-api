import dotenv from "dotenv"
dotenv.config()

import express from "express"
import { authenticate } from "./middlewares/authenticate"
import userRoutes from "./routers/user.routes"
import newsContentRoutes from "./routers/newsContent.routes"

const app: express.Express = express()
const port: number = 3002

//リクエストやレスポンスでjsonを使用
app.use(express.json())

app.use((req, res, next) => {
    const start = Date.now();
  
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`
      );
    });
  
    next();
  });
  
//認証ミドルウェア
app.use(authenticate)

app.use("/users", userRoutes)
app.use("/news-contents", newsContentRoutes)

//認証が通ってるかを確認する用
app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: "Authentication successful" })
})

//サーバーのポート指定
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})