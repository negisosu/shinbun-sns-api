"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("./middlewares/authenticate");
const app = (0, express_1.default)();
const port = 3002;
//リクエストやレスポンスでjsonを使用
app.use(express_1.default.json());
//Flutterから正しいaccessTokenを送られてきてるかを判定するmiddleware,自分でapi構築する時は使用しない
app.use(authenticate_1.authenticate);
// app.use("/users", userRoutes)
// app.use("/news-contents", newsContentRoutes)
app.get("/", (req, res) => {
    res.status(200).json({ message: "Authentication successful" });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
