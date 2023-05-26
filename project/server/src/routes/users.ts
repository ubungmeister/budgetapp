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

router.post('/create-user', async (req, res) => {
  const { username, email, adminID } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.json({ message: 'Email already exists' });
    }

    const admin = await prisma.user.findUnique({ where: { id: adminID } });
    const familyID =  admin.familyID;

    const randomPassword = Math.random().toString(36).slice(-8); // Generate a random password
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: 'USER', // Assigning the role as "USER" for new users
        familyID: familyID
      }
    });

    // Send email to the newly created user
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kidbugetapp@gmail.com',
        pass: 'xrwneibpcoeiwkwe'
  }
    });

    const mailOptions = {
      from: 'kidbugetapp@gmail.com',
      to: createdUser.email,
      subject: 'Welcome to the App!',
      text: `Your account has been created. Here are your login credentials:\nUsername: ${createdUser.username}\nPassword: ${randomPassword}\n\nPlease use the following link to access the app: https://your-app-url.com`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'User created and email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

router.get('/get-user', async (req, res) => {
  const userID = req.query.userID as string;
  if (!userID) {
    return res.json({ message: 'No user ID provided' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { id: userID } });
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
});

export {router as usersRouter}