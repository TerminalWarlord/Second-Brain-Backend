
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/user';
import Content from "./models/content";
import Tag from './models/tag';
import jwt from "jsonwebtoken";
import { authWall } from "./controller/middleware";


dotenv.config();

const app = express();

app.use(express.json());

app.post('/api/v1/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username })
    if (user) {
        res.status(403).json({
            message: "Username is already taken! Try a different one!"
        })
        return
    }
    const hashedPassword = await bcrypt.hash(password.toString(), 5);
    await User.create({
        username,
        password: hashedPassword
    })

    res.json({
        message: "Account has been created!"
    })
})


app.post('/api/v1/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username });

    if (!user) {
        res.status(403).json({
            message: "Username doesn't exist!"
        })
        return;
    }


    const passwordMatched = await bcrypt.compare(password, user.password);


    if (!passwordMatched) {
        res.status(403).json({
            message: "Invalid password!"
        })
        return;
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET!);

    res.json({
        message: "Successfully logged in!",
        token: token
    })
})

app.post('/api/v1/content', authWall, async (req, res) => {
    const link = req.body.link;
    const title = req.body.title
    const type = req.body.type
    // const tags = req.body.tags
    // @ts-ignore
    const userId = req.userId;



    if (!userId) {
        res.status(403).json({
            message: "You are not logged in!"
        });
        return;
    }

    await Content.create({
        link,
        title,
        type,
        userId,
        tags: []
    });
    res.json({
        message: "Content has been added"
    });

})

app.delete('/api/v1/content', (req, res) => {

})


app.post('/api/v1/brain/share', (req, res) => {

})


app.post('/api/v1/brain/:shareLink', (req, res) => {

})


app.listen(process.env.PORT || 3000, async () => {
    await mongoose.connect(process.env.MONGODB!);
    console.log('Started listening');
})