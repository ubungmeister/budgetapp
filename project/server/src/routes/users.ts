import express from "express"
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

const nodemailer = require("nodemailer");

const prisma = new PrismaClient();

const router = express.Router();



router.post('/create-user', async (req, res) => {
  const { userForm, userID } = req.body;
  const { username, email } = userForm;
  const adminID = userID;
  
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
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

    res.status(200).json({ message: 'User created and email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

router.get('/get-user', async (req, res) => {
  const userID = req.query.userID as string;
  if (!userID) {
    return res.status(400).json({ message: 'No user ID provided' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { id: userID } });
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
});

router.put('/edit-user/:id', async (req, res) => {
   const { userForm } = req.body;
   console.log(userForm);
   const { id, username, email } = userForm;
   if (!id || !username || !email) {
      return res.status(400).json({ message: 'Some data missing' });
   }
   try {
      const user = await prisma.user.update({
         where: { id: String(id) },
         data: {
            username,
            email
         }
      });
      res.status(200).json({ user });
   } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
      console.log(error);
   }
});

router.delete('/delete-user/:id', async (req, res) => {
  console.log(req.params);
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'No user ID provided' });
    }
    try {
        await prisma.user.delete({ where: { id: String(id) } });
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
        console.log(error);
    }
})

router.get('/get-users', async (req, res) => {
  const adminID = req.query.userID as string;
  if (!adminID) {
    return res.status(400).json({ message: 'No admin ID provided' });
  }
  try {
    const admin = await prisma.user.findUnique({ where: { id: adminID } });
    const users = await prisma.user.findMany(
      { where: 
        { familyID: admin.familyID ,
          id: { not: adminID }
        }
      }
      );
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
    console.log(error);
  }
});

router.get('/get-user-email', async (req, res) => {
  const userEmail = req.query.email as string;
  if (!userEmail) {
    return res.status(400).json({ message: 'No email provided' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if(user) {
      return  res.status(400).json({ message: 'Email already exists' });
    }
    else{
          res.status(200).json({ message: 'No user found' });
    }
  } catch (error) {
    console.log(error);
  }
})


export {router as usersRouter}