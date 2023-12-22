import express from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import {transporter} from "../utils/helpers"
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const router = express.Router();



router.post("/signup", async (req, res) => {
    const {username, password, email, familyName} = req.body;
    const existingUserWithEmail = await prisma.user.findUnique({where: {email}})

    if(existingUserWithEmail){
        res.json({message: "Email already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUniqID = Math.random().toString(36).slice(-8);

    const createFamily = await prisma.family.create({
        data: {
            id: createUniqID,
            name: familyName
        }
    })

    const createdUser = await prisma.user.create({
        data: {
            username: username,
            email, 
            password: hashedPassword,
            role: "ADMIN",
            familyID: createUniqID
        }
    })
    res.json(200).json({message: "User created successfully"})
  })

router.post("/signin", async (req, res) => {
    const {email, password} = req.body;

    const user = await prisma.user.findUnique({where: {email}});

    if (!user) {
    res.status(400).json({message: "Email or password is incorrect"})
    return;
}

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
    res.status(400).json({message: "Email or password is incorrect"})
    return;
}
    const token =  jwt.sign({email: user.email, id: user.id}, "test", {expiresIn: "1h"}) as string;
    const otpExpiry = new Date(Date.now()  + 120 * 60 * 1000); // 60 minutes from now

    await prisma.user.update({
        where: {email: email},
        data: {
            loginToken: token,
            loginTokenExpiry: otpExpiry
        }
    })

    res.json({userID:user.id, userRole:user.role, username: user.username , token, email: user.email })

})

router.post('/request-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
  const hashedOTP = await bcrypt.hash(otp, 10) as string;
  const otpExpiry = new Date(Date.now() + 5 * 60000); // 5 minutes from now
  
  try {
      const user = await prisma.user.update({
         where: { email: email },
         data: {
            resetTokenExpiry : otpExpiry,
            resetToken: hashedOTP
         }
      });

    const mailOptions = {
      from: 'kidbugetapp@gmail.com',
      to: user.email,
      subject: 'Password recovery!',
      text: `To recover tour password please enter verification code below\n OTP: ${otp} `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent' });
   } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
      console.log(error);
   }  
});


router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user) return res.status(400).json({message: "User does not exist"})
    
    // Check if OTP is valid and not expired
    const isOTPCorrect = await bcrypt.compare(otp, user.resetToken);
    if( !(isOTPCorrect && user.resetTokenExpiry > new Date())) return res.status(400).json({message: "OTP is incorrect or expired"})
    
    const verifiedToken = jwt.sign(
  { email: user.email, isVerified: true },
  process.env.JWT_SECRET, // Access the secret key from an environment variable
  { expiresIn: '10m' } // Set the token to expire in 10 minutes
);

    res.status(200).json({verifiedToken});
})

router.post('/reset-password', async (req, res) => {
  const {newPassword,verifiedToken } = req.body;


  try {
    // Verify the token and extract the payload
    const decoded = jwt.verify(verifiedToken, process.env.JWT_SECRET);

    if (decoded.isVerified) {

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password in the database
      await prisma.user.update({
        where: { email: decoded.email },
        data: { password: hashedPassword },
      });

      res.json({ message: "Password reset successfully." });
    } else {
      // The token was valid, but the isVerified flag was not true
      res.status(400).json({ message: "OTP verification is required." });
    }
  } catch (error) {
    // The token was invalid or expired
    res.status(403).json({ message: "Invalid or expired token." });
  }

});



export {router as authRouter}