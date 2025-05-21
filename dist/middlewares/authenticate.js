"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.SUPABASE_JWT_SECRET;
if (!secret) {
    throw new Error("SUPABASE_JWT_SECRET is not defined in environment variables.");
}
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Token not provided' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (typeof decoded !== "string") {
            req.user = decoded;
        }
        next();
    }
    catch (err) {
        res.status(403).json({ error: 'Invalid or expired token' });
        return;
    }
};
exports.authenticate = authenticate;
