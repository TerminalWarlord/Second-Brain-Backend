import jwt from "jsonwebtoken";
import User from '../models/user';
import { NextFunction, Request, Response } from "express";





export const authWall = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403).json({
            message: "No headers!"
        })
        return;
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const user = jwt.verify(token, JWT_SECRET!);
    // @ts-ignore
    if (user.userId) {
        // @ts-ignore
        req.userId = user.userId;
        next();
    }

}