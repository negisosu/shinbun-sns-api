"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newsContent_controller_1 = require("../controllers/newsContent.controller");
const router = express_1.default.Router();
router.get("/", newsContent_controller_1.getNewsContents);
router.get("/:id", newsContent_controller_1.getNewsContent);
router.post("/", newsContent_controller_1.createNewsContent);
router.post("/:id/is-favorite", newsContent_controller_1.postIsFavorite);
router.post("/:id/favorite-plus", newsContent_controller_1.postFavoritePlus);
router.post("/:id/favorite-minus", newsContent_controller_1.postFavoriteMinus);
router.delete("/:id", newsContent_controller_1.deleteNewsContent);
exports.default = router;
