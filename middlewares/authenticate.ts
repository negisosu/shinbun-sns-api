import jwt from "jsonwebtoken"
import express from "express"
import { MyJwtPayload } from "../types/express";

const secret = process.env.SUPABASE_JWT_SECRET;

if (!secret) {
    throw new Error("SUPABASE_JWT_SECRET is not defined in environment variables.");
}

export const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction): void => {

    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Token not provided' });
        return
    }

    try {
        const decoded = jwt.verify(token, secret) as MyJwtPayload;

        console.log(decoded)
        
        if(typeof decoded !== "string"){
            req.user = decoded as MyJwtPayload
        }
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token' });
        return
    }
};
