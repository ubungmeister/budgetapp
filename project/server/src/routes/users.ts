import express from "express"
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const router = express.Router();

// router.get('/', (req, res) => {
//     res.send({message: "Hello from users"})
// })

router.post("/signup", async (req, res) => {
    const {username, password, email} = req.body;
    const existingUserWithEmail = await prisma.user.findUnique({where: {email}})

    if(existingUserWithEmail){
        res.json({message: "Email already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
        data: {
            name: username,
            email, 
            password: hashedPassword
        }
    })

    res.json({message: "User created"})

    // const newUser = new prisma.user.create({
    //     username, email, password: hashedPassword
    // })
    // newUser.save();
    // res.json({message: "User created"})

})

export {router as usersRouter}