import express from "express"
import userRoutes from "./routers/user.routes"

const app: express.Express = express()
const port = 3002

app.use(express.json())
app.use("/users", userRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})