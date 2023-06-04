import express from "express"
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

const nodemailer = require("nodemailer");

const prisma = new PrismaClient();

const router = express.Router();



router.post("/signup", async (req, res) => {
    const {username, password, email} = req.body;
    const existingUserWithEmail = await prisma.user.findUnique({where: {email}})

    if(existingUserWithEmail){
        res.json({message: "Email already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUniqID = Math.random().toString(36).slice(-8);

    const createdUser = await prisma.user.create({
        data: {
            username: username,
            email, 
            password: hashedPassword,
            role: "ADMIN",
            familyID: createUniqID
        }
    })

    res.json({message: "User created"})
})

router.post("/signin", async (req, res) => {
    const {email, password} = req.body;

    const existingUserWithEmail = await prisma.user.findUnique({where: {email}});

    if (!existingUserWithEmail) {
    res.status(400).json({message: "Email or password is incorrect"})
    return;
}

    const isPasswordCorrect = await bcrypt.compare(password, existingUserWithEmail.password);

    if (!isPasswordCorrect) {
    res.status(400).json({message: "Email or password is incorrect"})
    return;
}
    console.log(existingUserWithEmail)
    const token =  jwt.sign({email: existingUserWithEmail.email, id: existingUserWithEmail.id}, "test", {expiresIn: "1h"})

    res.json({userID:existingUserWithEmail.id, userRole:existingUserWithEmail.role, token})

})

export {router as authRouter}